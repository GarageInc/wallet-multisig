import H3 from 'src/app/componentElements/Typography/Headings/H3'

import { formatCurrency, formatPlainNumber, sigFigs } from '../../../../helpers/formatters'
import { SContainer, SLabel } from './styled'

interface IProps {
  loading: boolean
  ticker?: string
  label?: string
  feeEstimate?: number
}

export const DisplayFee = ({ label, feeEstimate, ticker, loading }: IProps) => {
  return (
    <SContainer>
      <SLabel>{label}:</SLabel>
      {!loading && ticker ? (
        <H3 fontWeight={400}>
          {typeof feeEstimate !== 'number' && 'N/A'}
          {feeEstimate === 0 ? (
            'Free'
          ) : feeEstimate && feeEstimate > 0 ? (
            <>
              {formatPlainNumber(sigFigs(feeEstimate, 3))} {formatCurrency(ticker)}
            </>
          ) : null}
        </H3>
      ) : (
        <H3 fontWeight={400}>...</H3>
      )}
    </SContainer>
  )
}
