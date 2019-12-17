import { getArticleByIdAction } from './controller/Article'

export const AppRoutes = [
    {
        path: '/api/article/:sid',
        method: 'get',
        action: getArticleByIdAction,
    },
]
