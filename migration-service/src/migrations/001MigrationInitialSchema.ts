import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class Migration001InitialSchema implements MigrationInterface {
    name = 'Migration001InitialSchema';
    migration001up = fs.readFileSync(path.join(__dirname, 'common-sql', '001_initial_schema__up.sql'), 'utf8')
    migration001down = fs.readFileSync(path.join(__dirname, 'common-sql', '001_initial_schema_down.sql'), 'utf8')
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log(this.migration001up);
        await queryRunner.query(this.migration001up);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(this.migration001down);
    }
}