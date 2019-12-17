import axios from 'axios'
import * as cheerio from 'cheerio'
import { IArticle } from '../entity/Article'

const headers = {}

export function getArticleUrlBySid(sid: number): string {
    return `https://m.cnbeta.com/view/${sid}.htm`
}

export async function getArticleByCB(sid: number): Promise<IArticle | undefined> {
    let article: IArticle
    const url = getArticleUrlBySid(sid)
    const response = await axios.get(url, { responseType: 'text', headers })
    if (response.status === 200) {
        const $ = cheerio.load(response.data, { decodeEntities: false })
        const title = $('.article-tit').text()
        const input_time = new Date($('.article-byline .time').text())
        const source_name = $('.article-byline > span').text()
        const source_link = $('.article-byline > span > a').attr('href')
        const excerpt = $('.article-summ p').html()
        const content = $('#artibody').html()
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
