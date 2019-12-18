import * as cheerio from 'cheerio'
import { IArticle } from '../entity/Article'
import axios from '../util/axios'
import logger from '../util/logger'
const config = require('../../config.json')

const TAG = '[ArticleService]'

const headers = {
    // TODO: add cookie
    Referer: 'https://m.cnbeta.com/',
    'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
}

export function getArticleUrlBySid(sid: number): string {
    return `https://m.cnbeta.com/view/${sid}.htm`
}

export function replaceUrl(content: string) {
    return content.replace(/static.cnbetacdn.com/g, config['app']['static-cdn-host'])
}

export async function getArticleByCB(sid: number): Promise<IArticle | undefined> {
    let article: IArticle
    const url = getArticleUrlBySid(sid)
    logger.info(`${TAG} fetch url -> ${url}`)
    const response = await axios.get(url, { responseType: 'text', headers })
    logger.info(`${TAG} fetch response ${response.status}, response length ${response.data.length}`)

    // TODO: 异常情况 (1. 文章不存在 ...)
    if (response.status === 200) {
        const $ = cheerio.load(response.data, { decodeEntities: false })
        const title = $('.article-tit').text()
        const input_time = new Date($('.article-byline .time').text())
        const source_name = $('.article-byline > span').text()
        const source_link = $('.article-byline > span > a').attr('href')
        const excerpt = replaceUrl($('.article-summ p').html())
        const content = replaceUrl($('#artibody').html())
        article = {
            sid,
            title,
            input_time,
            source_name,
            source_link,
            excerpt,
            content,
        }
    }

    return article
}
