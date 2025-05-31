import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateDefaultUser1709234567892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryRunner.query(`
            INSERT INTO user (email, password, isActive, createdAt, updatedAt)
            VALUES ('admin@example.com', '${hashedPassword}', true, datetime('now'), datetime('now'))
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM user WHERE email = 'admin@example.com'
        `);
  }
}
