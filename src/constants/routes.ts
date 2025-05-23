import { ArticlesSvg, TagsSvg } from '@/_assets/svg/nav'

export const INDEX_PAGE = '/'
const ADMIN_PAGE = 'admin'

const CASINO = 'casino'
const ADD_CASINO = 'add-casino'
const UPDATE_CASINO = 'update-casino'
const NEWS = 'news'
const ADD_NEWS = 'add-news'
const UPDATE_NEWS = 'update-news'
const ARTICLE = 'article'
const ADD_ARTICLE = 'add-article'
const UPDATE_ARTICLE = 'update-article'
const HISTORY = 'history'
const ADD_HISTORY = 'add-history'
const UPDATE_HISTORY = 'update-history'
const ACCOUNT = 'account'
const SLOTS = 'slots'
const ADD_SLOTS = 'add-slots'
const UPDATE_SLOTS = 'update-slots'
const ADD_CATEGORY = 'add-category'
const UPDATE_CATEGORY = 'update-category'
const PROVIDERS = 'providers'
const ADD_PROVIDER = 'add-provider'
const UPDATE_PROVIDER = 'update-provider'
const ADD_GENRE = 'add-genre'
const UPDATE_GENRE = 'update-genre'
const OPENAI = 'openai'

export const routes = {
	ADMIN_PAGE,
	CASINO,
	ADD_CASINO,
	UPDATE_CASINO,
	NEWS,
	ADD_NEWS,
	UPDATE_NEWS,
	ARTICLE,
	ADD_ARTICLE,
	UPDATE_ARTICLE,
	HISTORY,
	ADD_HISTORY,
	UPDATE_HISTORY,
	ACCOUNT,
	SETTING_ROBOTS: 'setting-robots',
	CATEGORIES: 'categories',
	SLOTS,
	ADD_SLOTS,
	UPDATE_SLOTS,
	ADD_CATEGORY,
	UPDATE_CATEGORY,
	PROVIDERS,
	ADD_PROVIDER,
	UPDATE_PROVIDER,
	ADD_GENRE,
	UPDATE_GENRE,
	OPENAI,
}
export const navigate = [
	{
		name: 'Казино',
		link: CASINO,
		icon: ArticlesSvg,
	},
	// {
	// 	name: 'Новости',
	// 	link: NEWS,
	// 	icon: NewsSvg,
	// },
	// {
	// 	name: 'Статьи',
	// 	link: ARTICLE,
	// 	icon: ArticlesSvg,
	// },

	// {
	// 	name: 'Провайдеры',
	// 	link: PROVIDERS,
	// 	icon: HistorySvg,
	// },
	// {
	// 	name: 'Robots.txt',
	// 	link: routes.SETTING_ROBOTS,
	// 	icon: RobotsSvg,
	// },
	{
		name: 'Категории',
		link: routes.CATEGORIES,
		icon: TagsSvg,
	},
	// {
	// 	name: 'Генерация',
	// 	link: routes.OPENAI,
	// 	icon: ArticlesSvg,
	// },
]
