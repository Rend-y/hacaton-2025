import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { TeamsService } from '../teams/teams.service';
import { TeamStatus } from 'src/teams/entities/team.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private teamsService: TeamsService,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    this.logger.log(`Creating new task: ${task.name}`);
    const newTask = this.tasksRepository.create(task);
    const savedTask = await this.tasksRepository.save(newTask);
    this.logger.log(`Task created successfully with id: ${savedTask.id}`);
    return savedTask;
  }

  async findAll(params: {
    page: number;
    limit: number;
    skip: number;
    sort: 'deadline' | 'status';
  }) {
    const { page, limit, skip, sort } = params;
    const tasks = await this.tasksRepository.find({
      relations: ['assignedTeam'],
      order: { [sort]: 'DESC' },
      skip: skip || (page - 1) * limit,
      take: limit,
    });
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    this.logger.log(`Finding task with id: ${id}`);
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['assignedTeam'],
    });
    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.logger.log(`Task with id ${id} found`);
    return task;
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    this.logger.log(`Updating task with id: ${id}`);
    await this.tasksRepository.update(id, task);
    const updatedTask = await this.findOne(id);
    this.logger.log(`Task with id ${id} updated successfully`);
    return updatedTask;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing task with id: ${id}`);
    await this.tasksRepository.delete(id);
    this.logger.log(`Task with id ${id} removed successfully`);
  }

  async assignTeam(taskId: number, teamId: number): Promise<Task> {
    this.logger.log(`Assigning team ${teamId} to task ${taskId}`);

    const task = await this.findOne(taskId);
    const team = await this.teamsService.findOne(teamId);

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    task.assignedTeam = team;
    task.teamId = teamId;
    task.status = TaskStatus.IN_PROGRESS;

    const updatedTask = await this.tasksRepository.save(task);
    await this.teamsService.changeStatus(teamId, TeamStatus.IN_PROJECT);
    this.logger.log(`Team ${teamId} successfully assigned to task ${taskId}`);

    return updatedTask;
  }
}
