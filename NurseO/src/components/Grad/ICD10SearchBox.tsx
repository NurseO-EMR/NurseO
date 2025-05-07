import AsyncSelect from 'react-select/async';

import { api } from '~/utils/api';

type Props = {
    onChange: (code: { code: string, description: string }) => void
}

export function ICD10SearchBox(props: Props) {
    const getICD10CodesMutation = api.grad.getICD10CodeByDescription.useMutation()

    const getOptions = async (description: string) => {
        const data = await getICD10CodesMutation.mutateAsync({ description })
        return data.data?.map(d => ({ value: d.code, label: d.description })) ?? []
    }

    return (
        <AsyncSelect loadOptions={getOptions} onChange={v => v && props.onChange({ code: v.value, description: v.label })} />

    )
}