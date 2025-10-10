import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class Migration002AddNameToUsers implements MigrationInterface {
    name = 'Migration002AddNameToUsers';
    migration001up = fs.readFileSync(path.join(__dirname, 'common-sql', '002_user_add_name__up.sql'), 'utf8')
    migration001down = fs.readFileSync(path.join(__dirname, 'common-sql', '002_user_add_name_down.sql'), 'utf8')
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log(this.migration001up);
        await queryRunner.query(this.migration001up);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(this.migration001down);
    }
}