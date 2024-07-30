import { useMemo } from 'react'
import ReactJson from 'react-json-view'
import logger from 'src/app/helpers/appLogger'
import { IMessage } from 'src/shared/interfaces/interfaces'

import { MessageBlock } from '../DappRequestedTemplate/styles'
import { Message, Row } from './styles'

/**
 * Convert provided hex into text if possible, or return
 * provided hex value.
 */
const msgHexToText = (hex: string) => {
  try {
    const stripped = hex.startsWith('0x') ? hex.substring(2) : hex
    const buff = Buffer.from(stripped, 'hex')
    return buff.length === 32 ? hex : buff.toString('utf8')
  } catch (e) {
    return hex
  }
}

export const SignMessageView = ({ signInMsg }: { signInMsg: IMessage }) => {
  const orgMessage = useMemo(
    () => signInMsg?.raw?.params[0]?.data || signInMsg?.raw?.params?.data || signInMsg?.raw?.params || [],
    [signInMsg],
  )

  const rows = useMemo(() => {
    if (!signInMsg) {
      return []
    }

    if (signInMsg.raw.method === 'personal_sign') {
      return [{ name: 'Message', value: msgHexToText(orgMessage) || orgMessage }]
    } else if (signInMsg.raw.method === 'eth_sign') {
      return [{ name: 'Message', value: orgMessage }]
    } else if (signInMsg.raw.method?.startsWith?.('eth_signTypedData')) {
      return orgMessage
    } else if (signInMsg.raw.method === 'sign') {
      return Object.keys(signInMsg?.raw?.params).reduce((result: any[], name: string) => {
        if (['msgs', 'fee'].indexOf(name) === -1) {
          return result
        } else {
          return [
            ...result,
            {
              name,
              value: signInMsg?.raw?.params[name],
            },
          ]
        }
      }, [])
    }
    return Array.isArray(orgMessage) ? orgMessage : [{ value: JSON.stringify(orgMessage) }]
  }, [signInMsg, orgMessage])

  const decodedData: any = useMemo(() => {
    logger.debug(`orgMessage: ${orgMessage}`)
    try {
      return JSON.parse(orgMessage)
    } catch {
      logger.debug('orgMessage is not object')
    } finally {
      logger.debug(`orgMessage: ${orgMessage}`)
    }
  }, [orgMessage])

  return (
    <>
      {decodedData && decodedData.message && decodedData.domain ? (
        <>
          {(decodedData.message || decodedData.domain) && (
            <MessageBlock>
              <ReactJson
                src={decodedData.message}
                enableClipboard={false}
                collapseStringsAfterLength={20}
                displayDataTypes={false}
                name={null}
                theme="railscasts"
              />
            </MessageBlock>
          )}
        </>
      ) : (
        <Message>
          {rows?.map?.(({ value }: any, idx: number) => (
            <Row key={idx}>
              <div>{value}</div>
            </Row>
          ))}
        </Message>
      )}
    </>
  )
}
