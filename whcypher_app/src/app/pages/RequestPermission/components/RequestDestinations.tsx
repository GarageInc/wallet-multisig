import React from 'react'

import TextInput from '../../../components/Form/TextInput/TextInput'

interface IProps {
  destinations: any[]
}

const RequestDestinations = ({ destinations }: IProps) => (
  <div style={{ display: 'grid', gridTemplateRows: '0.9fr', padding: 20 }}>
    <div>
      {destinations.map(({ blockchain, address }) => (
        <TextInput
          key={`${blockchain}:${address}`}
          label={blockchain}
          value={address}
          extraStyles={{ marginBottom: 20 }}
        />
      ))}
    </div>
  </div>
)

export default RequestDestinations
