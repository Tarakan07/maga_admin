import React from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { useLanguage } from '@/libs/context/LanguageProvider'
import CatEdit from './CatEdit/CatEdit'
import s from './WrapperCat.module.scss'
import WrapperAddNewResource from '../_common/_comp/WrapperAddNewResource'
const WrapperCategories = () => {
	const { getLocalization } = useLanguage()

	return (
		<WrapperAddNewResource
			title={getLocalization('Категории')}
			goBack={false}
			rightComp={null}
		>
			<div className={s.wrap}>
				<div className={s.main_block}>
					{false ? <Loader params={{ visible: false }} /> : <CatEdit />}
				</div>
			</div>
		</WrapperAddNewResource>
	)
}

export default WrapperCategories
