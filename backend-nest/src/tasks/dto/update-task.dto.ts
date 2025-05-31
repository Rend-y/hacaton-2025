import {
  IsOptional,
  IsString,
  IsObject,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Обновленное название задачи',
    description: 'Название задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Обновленное описание задачи',
    description: 'Подробное описание задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: { key1: 'newValue1', key2: 'newValue2' },
    description: 'Дополнительные данные задачи в формате JSON',
    required: false,
  })
  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @ApiProperty({
    example: TaskStatus.IN_PROGRESS,
    description: 'Статус задачи',
    enum: TaskStatus,
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
