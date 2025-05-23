import Select from '@/features/Constructor/_common/_comp/Select/Select'
import { P } from '@/libs/UI/CustomTags'
import { TCasinoBody } from '@/services/API/casino/casino.type'
import { TSlotBody } from '@/services/API/slots/slots.type'
import s from './ProviderResource.module.scss'
import { useEffect } from 'react'
import { useFetchConfigSlots } from '../../_hooks/use-slots'
import { useFetchConfigCasinos } from '../../_hooks/use-casino'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'

const AddedIconArray = ({ name }: { name: string }) => {
	return <P>{name}</P>
}
const FeatureIconArray = ({ name }: { name: string }) => {
	return <P>{name}</P>
}

type TProps = {
  selectedSlots: TSlotBody[]
  handleChangeSlots: ({ value }: { value: TSlotBody }) => void
  selectedCasinos: TCasinoBody[]
  handleChangeCasinos: ({ value }: { value: TCasinoBody }) => void
}

const ProviderResource = ({
  selectedSlots,
  handleChangeSlots,
  selectedCasinos,
  handleChangeCasinos,
}: TProps) => {
  const { lang } = useLang()
  const { allSlots } = useFetchConfigSlots()
  const { allCasinos } = useFetchConfigCasinos()
  return (
    <div className={s.selects}>
      <Select
        label="Казино"
        dataAdded={selectedCasinos.filter((casino) => casino.language === lang)}
        value={allCasinos}
        DataComponent={(e) => <AddedIconArray name={e.item.name} />}
        ValueComponent={(e) => <FeatureIconArray name={e.item.name} />}
        placeholder="Казино"
        onGetTextForSearch={(e) => e.name}
        onChange={(e) => handleChangeCasinos({ value: e })}
        isWithSearch={true}
      />
      <Select
        label="Слоты"
        dataAdded={selectedSlots.filter((slot) => slot.language === lang)}
        value={allSlots}
        DataComponent={(e) => <AddedIconArray name={e.item.name} />}
        ValueComponent={(e) => <FeatureIconArray name={e.item.name} />}
        placeholder="Слоты"
        onGetTextForSearch={(e) => e.name}
        onChange={(e) => handleChangeSlots({ value: e })}
        isWithSearch={true}
      />
    </div>
  )
}

export default ProviderResource