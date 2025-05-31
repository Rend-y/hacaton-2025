import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTeamIdToTasks1709234567897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add teamId column
    await queryRunner.query(`
      ALTER TABLE task
      ADD COLUMN teamId INTEGER REFERENCES teams(id) ON DELETE SET NULL DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove teamId column
    await queryRunner.query(`
      ALTER TABLE task
      DROP COLUMN teamId
    `);
  }
}
