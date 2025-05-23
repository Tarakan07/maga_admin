export const generateLink = (value: string): string => {
	const cyrillicToLatinMap: { [key: string]: string } = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'kh',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
	}

	let text = value.toLowerCase()
	let transliteratedText = text
		.split('')
		.map((char) => cyrillicToLatinMap[char] || char)
		.join('')
	transliteratedText = transliteratedText.replace(/[^a-z0-9\-]/g, '-')
	transliteratedText = transliteratedText.replace(/-+/g, '-')
	transliteratedText = transliteratedText.replace(/^-+|-+$/g, '')

	return transliteratedText
}
