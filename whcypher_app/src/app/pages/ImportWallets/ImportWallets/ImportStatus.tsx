import { Box, Button, Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'

import Icon from '../../../componentElements/Icon/Icon'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import styles from './ImportStatus.module.scss'

interface IProps {
  validWalletsNames: any[]
  invalidWalletsNames: any[]
  goBack: () => void
}

const ImportStatus = ({ validWalletsNames, invalidWalletsNames, goBack }: IProps) => {
  const [activeExpand, setActiveExpand] = useState<string | null>(null)

  const handleExpand = useCallback(
    (expand: string) => {
      if (expand === activeExpand) {
        setActiveExpand(null)
      } else {
        setActiveExpand(expand)
      }
    },
    [activeExpand],
  )

  return (
    <ContentWrapper title="Import status">
      <div className={styles.container}>
        <Grid xs={12} classes={{ root: styles.walletsPanel }}>
          <div className={styles.walletsList}>
            {validWalletsNames.length > 0 && (
              <div>
                <div className={styles.listTitle} onClick={() => handleExpand('successfully')}>
                  <div>Successfully imported: {validWalletsNames.length} Wallets</div>
                  <Icon icon="chevron-bottom" size={12} />
                </div>
                {activeExpand === 'successfully' && (
                  <div>
                    {validWalletsNames.map((walletName, index) => (
                      <div key={index} className={styles.walletInfo}>
                        {walletName.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {invalidWalletsNames.length > 0 && (
              <div>
                <div className={styles.listTitle} onClick={() => handleExpand('failed')}>
                  <div>Failed to import: {invalidWalletsNames.length} Wallets</div>
                  <Icon icon="chevron-bottom" size={12} />
                </div>
                {activeExpand === 'failed' && (
                  <div>
                    {invalidWalletsNames.map((walletName, index) => (
                      <div key={index} className={styles.walletInfo}>
                        {walletName.name}
                        {Object.values(walletName).map((errors: any[], index: number) =>
                          errors.map((error: any) => (
                            <div key={index} className={styles.errorWrapper}>
                              <div className={styles.error}>{error}</div>
                            </div>
                          )),
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Grid>

        <Box mx={2} mt={4}>
          <Button variant="contained" color="primary" onClick={goBack} fullWidth>
            <Icon icon="left-arrow" color="white" size={12} style={{ marginRight: 5 }} />
            Back
          </Button>
        </Box>
      </div>
    </ContentWrapper>
  )
}

export default ImportStatus
