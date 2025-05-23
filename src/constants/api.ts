const BASE_PROD = 'https://lk.casino-track.com/-api-'
const BASE_LEVA_URL = 'https://lk.leva-ndar.ru/-api-'

const BASE_CDN_LEVA = 'https://s3.leva-ndar.ru/images'
const BASE_CDN_MAIN = 'https://s3.casino-track.com/images'

const BASE_URL = BASE_PROD

const BASE_CDN_URL = BASE_CDN_MAIN

const PREFIX = {
	current_prefix: '/v1',
	auth: '/v1/auth',
}
const SERVICES = {
	casino: `${PREFIX.current_prefix}/casinos`,
	slots: `${PREFIX.current_prefix}/slots`,
	news: `${PREFIX.current_prefix}/news`,
	history: `${PREFIX.current_prefix}/stories`,
	image_cdn: `${PREFIX.current_prefix}/images`,
	image_cdn_public: `/v1/file/image`,
	articles: `${PREFIX.current_prefix}/articles`,
	auth: `${PREFIX.auth}`,
	robots: `${PREFIX.current_prefix}/robots`,
	openai: `${PREFIX.current_prefix}/openai`,
}

const Path = {}

export { BASE_URL, BASE_CDN_URL, PREFIX, SERVICES, Path }
