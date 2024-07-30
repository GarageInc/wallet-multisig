import { Drawer, Hidden, makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from 'src/app/componentElements/Colors'
import { useAppTabParams } from 'src/app/hooks/useAppTabParams'
import { AppState } from 'src/serviceWorker/app/store/store'

import { createAvatarSvg } from '../../helpers/publicKeyImageCreator'
import DrawerMenu from './DrawerMenu'
import {
  AppBarStyled,
  SAccountWrapper,
  SAvatarImage,
  SContainer,
  SDownIcon,
  SIconButton,
  SLogo,
  SRight,
  SToolbar,
} from './styleds'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

const AppHeader = () => {
  const { unlocked, activeAccountPubkey: pubKey } = useSelector((state: AppState) => state.application)

  const { isPopup: isExtensionIsOpenedInTab } = useAppTabParams()

  const classes = useStyles()
  const [svgAvatar, setSvgAvatar] = useState<string>('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const svg = pubKey && createAvatarSvg(pubKey)
    setSvgAvatar(svg)
  }, [pubKey])

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpen)
  }, [drawerOpen])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <AppBarStyled position="relative" elevation={0}>
      <SContainer>
        <SToolbar>
          <SLogo>
            <img alt="avatar" src="../../../static/image/logo.svg" />
          </SLogo>
        </SToolbar>

        {unlocked && !isExtensionIsOpenedInTab && svgAvatar && (
          <SRight>
            <SAccountWrapper onClick={handleDrawerToggle}>
              <SIconButton>
                <SAvatarImage alt="avatar" src={`data:image/svg+xml;utf8,${encodeURIComponent(svgAvatar)}`} />
              </SIconButton>
              <SDownIcon color={COLORS.palette.white} />
            </SAccountWrapper>

            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden xsUp implementation="css">
                <Drawer
                  variant="temporary"
                  anchor="right"
                  open={drawerOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  <DrawerMenu onClose={handleDrawerToggle} closeDrawer={closeDrawer} />
                </Drawer>
              </Hidden>
            </nav>
          </SRight>
        )}
      </SContainer>
    </AppBarStyled>
  )
}

export default AppHeader
