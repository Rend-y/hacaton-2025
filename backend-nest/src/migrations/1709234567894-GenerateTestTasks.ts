import { MigrationInterface, QueryRunner } from 'typeorm';
import { TaskStatus } from '../tasks/entities/task.entity';

export class GenerateTestTasks1709234567894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tasks = Array.from({ length: 30 }, (_, index) => {
      const statuses = Object.values(TaskStatus);
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      // Генерируем случайную дату в будущем (в пределах 30 дней)
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 30));

      return {
        name: `Тестовая задача ${index + 1}`,
        description: `Описание тестовой задачи ${index + 1}`,
        status: randomStatus,
        deadline: deadline.toISOString(),
        content: {
          priority: Math.floor(Math.random() * 3) + 1,
          tags: ['тест', 'генерация', `тег${index + 1}`],
          metadata: {
            createdBy: 'system',
            version: '1.0',
          },
        },
      };
    });

    for (const task of tasks) {
      await queryRunner.query(
        `
                INSERT INTO task (name, description, status, deadline, content, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
            `,
        [
          task.name,
          task.description,
          task.status,
          task.deadline,
          JSON.stringify(task.content),
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM task WHERE name LIKE 'Тестовая задача%'`,
    );
  }
}
