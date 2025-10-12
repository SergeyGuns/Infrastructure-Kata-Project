import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class Migration003AddAdminUser implements MigrationInterface {
    name = 'Migration003AddAdminUser';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Only run this migration in development environment
        if (process.env.NODE_ENV === 'production') {
            console.log('Skipping admin user creation - not in development environment');
            return;
        }
        
        const migrationUp = fs.readFileSync(
            path.join(__dirname, 'common-sql', '003_add_admin_user__up.sql'), 
            'utf8'
        );
        console.log(migrationUp);
        await queryRunner.query(migrationUp);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Only run this migration in development environment
        if (process.env.NODE_ENV === 'production') {
            console.log('Skipping admin user removal - not in development environment');
            return;
        }
        
        const migrationDown = fs.readFileSync(
            path.join(__dirname, 'common-sql', '003_add_admin_user_down.sql'), 
            'utf8'
        );
        await queryRunner.query(migrationDown);
    }
}