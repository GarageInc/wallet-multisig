import { IFlexBox } from 'src/app/componentElements/FlexBox/FlexBox.interface'

export interface ICard extends IFlexBox {
  round?: boolean // round border
  noShadow?: boolean // shadow
}
