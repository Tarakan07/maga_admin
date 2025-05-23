type TContentRobotsString = {
	'Clean-param': string
	Sitemap: string
}
export type TContentRobotsPrimitive = {
	Disallow: string[]
	Allow: string[]
}
//

export type TContentRobots = TContentRobotsString & TContentRobotsPrimitive
export type TRobots = {
	user_agent: string
	content: TContentRobots
}
export type TRobotsGetRes = {
	items: TRobots[]
}

export type TRobotsUpdateReq = {
	user_agent: string
	content: TContentRobots
}
