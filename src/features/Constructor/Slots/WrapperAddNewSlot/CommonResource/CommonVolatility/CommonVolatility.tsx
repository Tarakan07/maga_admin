import { SelectorHOC } from '@/libs/HOC'
import React from 'react'
import { TVolatilityKey } from '../data'
import ItemStatus from './ItemStatus/ItemStatus'
import s from './CommonVolatility.module.scss'

type TProps = {
    dataSelector: TVolatilityKey[]
    updateDataSelector: (key: TVolatilityKey) => void
}

const CommonVolatility = ({ dataSelector, updateDataSelector }: TProps) => {
  return (
    <div className={s.volatility}>
        <SelectorHOC background="var(--casino-bg-blue-grey)">
            <ItemStatus {...{ dataSelector, updateDataSelector }} />
        </SelectorHOC>
    </div>
  )
}

export default CommonVolatility