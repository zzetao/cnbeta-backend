/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateArticle1576590228471 implements MigrationInterface {
    name = 'UpdateArticle1576590228471'

    public async up(queryRunner: QueryRunner): Promise<any> {
        // eslint-disable-line
        await queryRunner.query("ALTER TABLE `article` CHANGE `excerpt` `excerpt` text NULL COMMENT '文章摘要'", undefined)
        await queryRunner.query("ALTER TABLE `article` CHANGE `source_name` `source_name` varchar(255) NULL COMMENT '来源名称'", undefined)
        await queryRunner.query("ALTER TABLE `article` CHANGE `source_link` `source_link` varchar(255) NULL COMMENT '来源链接'", undefined)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `article` CHANGE `source_link` `source_link` varchar(255) NULL COMMENT '来源链接' DEFAULT ''", undefined)
        await queryRunner.query("ALTER TABLE `article` CHANGE `source_name` `source_name` varchar(255) NOT NULL COMMENT '来源名称'", undefined)
        await queryRunner.query("ALTER TABLE `article` CHANGE `excerpt` `excerpt` text NOT NULL COMMENT '文章摘要'", undefined)
    }

}
