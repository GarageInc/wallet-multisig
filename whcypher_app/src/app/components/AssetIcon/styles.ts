import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const Text = styled.span`
  width: 100%;
  height: 100%;
  background: ${COLORS.backgroundGrey};
  border-radius: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`

export const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export const Container = styled.div`
  width: 22px;
  height: 22px;
`
