import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1709234567893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE task (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL,
                description TEXT,
                content JSON,
                status VARCHAR DEFAULT 'pending',
                deadline DATETIME,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE task`);
  }
}
