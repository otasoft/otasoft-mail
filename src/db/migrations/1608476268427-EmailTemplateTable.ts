import {MigrationInterface, QueryRunner} from "typeorm";

import { emailTemplates } from "../../templates/email-templates";

export class EmailTemplateTable1608476268427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert().into('email-template').values([
            ...emailTemplates
        ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE email-template');
    }

}
