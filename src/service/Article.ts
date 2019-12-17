import * as cheerio from 'cheerio'
import { IArticle } from '../entity/Article'
import axios from '../util/axios'

const headers = {
    // TODO: add cookie
    Referer: 'https://m.cnbeta.com/',
    'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
}

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
