/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateArticle1576563907306 implements MigrationInterface {
    name = 'CreateArticle1576563907306'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "CREATE TABLE `article` (`id` int NOT NULL AUTO_INCREMENT, `sid` int NOT NULL COMMENT 'cnbeta 文章ID', `title` varchar(255) NOT NULL COMMENT '文章标题', `excerpt` text NOT NULL COMMENT '文章摘要', `content` text NOT NULL COMMENT '文章内容', `source_name` varchar(255) NOT NULL COMMENT '来源名称', `source_link` varchar(255) NOT NULL COMMENT '来源链接', `input_time` datetime NOT NULL COMMENT '文章发布日期', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`, `sid`)) ENGINE=InnoDB",
            undefined,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `article`', undefined)
    }
}
