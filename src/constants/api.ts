const BASE_PROD = 'http://89.221.203.201:5002/api/'

const BASE_CDN_MAIN = 'https://89.221.203.201:5002/images'

const BASE_URL = BASE_PROD
// http://89.221.203.201:5002/api/v1/images/3b75c7f6-ee8d-40e7-9340-89e8c2c6ff0d
// const BASE_CDN_URL = BASE_CDN_MAIN

const PREFIX = {
	current_prefix: 'v1',
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
const BASE_CDN_URL = `${BASE_PROD}${SERVICES.image_cdn}`

const Path = {}

export { BASE_URL, BASE_CDN_URL, PREFIX, SERVICES, Path }
