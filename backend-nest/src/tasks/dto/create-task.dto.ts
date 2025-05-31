import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Название задачи',
    description: 'Название задачи',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Описание задачи',
    description: 'Подробное описание задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: { key1: 'value1', key2: 'value2' },
    description: 'Дополнительные данные задачи в формате JSON',
    required: false,
  })
  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @ApiProperty({
    example: TaskStatus.NEW,
    description: 'Статус задачи',
    enum: TaskStatus,
    default: TaskStatus.NEW,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    example: '2024-03-01T12:00:00Z',
    description: 'Срок выполнения задачи',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deadline?: Date;
}
