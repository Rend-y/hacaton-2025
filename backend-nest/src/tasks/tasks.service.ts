import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    this.logger.log(`Creating new task: ${task.name}`);
    const newTask = this.tasksRepository.create(task);
    const savedTask = await this.tasksRepository.save(newTask);
    this.logger.log(`Task created successfully with id: ${savedTask.id}`);
    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    this.logger.log('Finding all tasks');
    const tasks = await this.tasksRepository.find();
    this.logger.log(`Found ${tasks.length} tasks`);
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    this.logger.log(`Finding task with id: ${id}`);
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
    } else {
      this.logger.log(`Task with id ${id} found`);
    }
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
}
