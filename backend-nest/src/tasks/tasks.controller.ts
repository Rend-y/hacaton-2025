import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './entities/task.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    type: Task,
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks with pagination, sorting, search and filtering',
  })
  @ApiResponse({ status: 200, description: 'Return all tasks', type: [Task] })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Skip items',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['deadline', 'status'],
    description: 'Sort field',
  })
  @ApiQuery({ name: 'query', required: false, description: 'Search query' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filter by status',
  })
  findAll(
    @Query('limit') limit: number = 10,
    @Query('skip') skip: number = 0,
    @Query('sort') sort: 'deadline' | 'status' = 'deadline',
    @Query('query') query?: string,
    @Query('status') status?: TaskStatus,
  ) {
    return this.tasksService.findAll({
      limit,
      skip,
      sort,
      query,
      status,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, description: 'Return task by id', type: Task })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update task by id' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully updated',
    type: Task,
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/assign-team')
  @ApiOperation({ summary: 'Assign team to task' })
  @ApiResponse({
    status: 200,
    description: 'Team successfully assigned to task',
    type: Task,
  })
  assignTeam(@Param('id') id: string, @Body('teamId') teamId: number) {
    return this.tasksService.assignTeam(+id, teamId);
  }
}
