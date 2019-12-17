import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

export interface IArticle {
    sid: number
    title: string
    excerpt?: string
    content: string
    source_name?: string
    source_link?: string
    input_time: Date
}

@Entity()
export class Article implements IArticle {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn({
        comment: 'cnbeta 文章ID',
    })
    sid: number

    @Column({
        type: 'varchar',
        length: 255,
        comment: '文章标题',
    })
    title: string

    @Column({
        type: 'text',
        comment: '文章摘要',
        nullable: true,
    })
    excerpt: string

    @Column({
        type: 'text',
        comment: '文章内容',
    })
    content: string

    @Column({
        type: 'varchar',
        length: 255,
        comment: '来源名称',
        nullable: true,
    })
    source_name: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '来源链接',
    })
    source_link: string

    @Column({
        type: 'datetime',
        comment: '文章发布日期',
    })
    input_time: Date

    @CreateDateColumn()
    created_at: Date
}
