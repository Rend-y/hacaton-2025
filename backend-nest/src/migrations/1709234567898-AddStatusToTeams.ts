import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToTeams1709234567898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE teams
      ADD COLUMN status VARCHAR DEFAULT 'available' CHECK (status IN ('available', 'in_project', 'on_break'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE teams
      DROP COLUMN status
    `);
  }
}
