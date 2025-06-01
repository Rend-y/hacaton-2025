import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team, TeamStatus } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    this.logger.log(`Creating new team: ${createTeamDto.name}`);
    const team = this.teamsRepository.create(createTeamDto);
    const savedTeam = await this.teamsRepository.save(team);
    this.logger.log(`Team created successfully with id: ${savedTeam.id}`);
    return savedTeam;
  }

  async findAll(params: {
    page: number;
    limit: number;
    skip: number;
  }): Promise<Team[]> {
    const { page, limit, skip } = params;
    const teams = await this.teamsRepository.find({
      skip: skip || (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return teams;
  }

  async findOne(id: number): Promise<Team> {
    this.logger.log(`Finding team with id: ${id}`);
    const team = await this.teamsRepository.findOne({ where: { id } });
    if (!team) {
      this.logger.warn(`Team with id ${id} not found`);
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    this.logger.log(`Team with id ${id} found`);
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    this.logger.log(`Updating team with id: ${id}`);
    await this.teamsRepository.update(id, updateTeamDto);
    const updatedTeam = await this.findOne(id);
    this.logger.log(`Team with id ${id} updated successfully`);
    return updatedTeam;
  }

  async changeStatus(id: number, status: TeamStatus): Promise<Team> {
    this.logger.log(`Changing status of team ${id} to ${status}`);
    const team = await this.findOne(id);
    team.status = status;
    this.logger.log(`Team ${id} status changed to ${team.status}`);
    const updatedTeam = await this.teamsRepository.save(team);
    this.logger.log(`Team ${id} status changed to ${status}`);
    return updatedTeam;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing team with id: ${id}`);
    await this.teamsRepository.delete(id);
    this.logger.log(`Team with id ${id} removed successfully`);
  }
}
