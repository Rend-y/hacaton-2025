import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTestTeams1709234567896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "teams" ("name", "members", "techStack", "description") VALUES
      (
        'Alpha Squad',
        '[{"name": "Alex Johnson", "position": "Team Lead"}, {"name": "Sarah Chen", "position": "Frontend Developer"}, {"name": "Mike Brown", "position": "Backend Developer"}]',
        '["React", "Node.js", "PostgreSQL", "TypeScript"]',
        'Full-stack development team specializing in web applications'
      ),
      (
        'Beta Innovators',
        '[{"name": "Emma Wilson", "position": "Project Manager"}, {"name": "David Kim", "position": "UI/UX Designer"}, {"name": "Lisa Patel", "position": "Mobile Developer"}]',
        '["React Native", "Figma", "Firebase", "Swift"]',
        'Mobile-first team focused on innovative user experiences'
      ),
      (
        'Gamma Tech',
        '[{"name": "James Smith", "position": "Tech Lead"}, {"name": "Maria Garcia", "position": "DevOps Engineer"}, {"name": "Tom Lee", "position": "QA Engineer"}]',
        '["Docker", "Kubernetes", "AWS", "Python"]',
        'Infrastructure and automation specialists'
      ),
      (
        'Delta Solutions',
        '[{"name": "Anna White", "position": "Product Owner"}, {"name": "Chris Martin", "position": "Full Stack Developer"}, {"name": "Rachel Green", "position": "Data Scientist"}]',
        '["Vue.js", "Django", "TensorFlow", "MongoDB"]',
        'AI and data-driven solutions team'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "teams" WHERE "name" IN ('Alpha Squad', 'Beta Innovators', 'Gamma Tech', 'Delta Solutions')`,
    );
  }
}
