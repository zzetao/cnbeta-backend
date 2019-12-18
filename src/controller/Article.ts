import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Article } from '../entity/Article'
import { getArticleByCB } from '../service/Article'
import logger from '../util/logger'

const TAG = '[ArticleController]'

export async function getArticleByIdAction(request: Request, response: Response) {
    const articleRepository = getManager().getRepository(Article)

    const sid: number = +request.params.sid

    const res = {
        state: 'success',
        message: '',
        result: null,
        token: null,
    }

    // 1. 从 DB 取
    let article = await articleRepository.findOne({ sid })

    logger.info(`${TAG} get article by db -> ${!!article}`)

    // 2. 取不到从源站取
    if (!article) {
        const source = await getArticleByCB(sid)
        article = await articleRepository.save(source)
        logger.info(`${TAG} get article by source -> ${!!article}`)
    }

    if (!article) {
        res.state = 'fail'
        res.message = '获取资讯详情失败'
    } else {
        res.result = article
    }

    response.send(res)
}
