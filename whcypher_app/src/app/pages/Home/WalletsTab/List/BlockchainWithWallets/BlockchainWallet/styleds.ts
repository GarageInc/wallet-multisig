import { COLORS } from 'src/app/componentElements/Colors'
import styled from 'styled-components'

export const SWalletEntry = styled.div<{ isHidden: boolean; isBackupRequired: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px 12px;
  background-color: ${({ isBackupRequired }) =>
    isBackupRequired ? COLORS.palette.lightRed : COLORS.palette.lightBlue};
  margin-bottom: 8px;
  opacity: ${({ isHidden }) => (isHidden ? 0.5 : 1)};
  border-radius: 4px;
  position: relative;

  &:hover {
    cursor: pointer;

    background-color: ${({ isBackupRequired }) =>
      isBackupRequired ? COLORS.palette.lightRedHover : COLORS.palette.lightBlueHover};
  }

  .walletInfo {
    text-align: left;
  }

  .walletNameWrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    .walletName {
      font-size: 15px;
      max-width: 110px;
    }

    .walletIcon {
      padding: 4px;
      margin-left: 9px;
    }

    .badgeWrapper {
      border-radius: 3px;
      background: #455cc2;
      color: #fff;
      width: 34px;
      height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      margin-top: 3px;

      .badge {
        font-size: 11px;
      }
    }
  }

  .walletAddressWrapper {
    display: flex;
    align-items: center;

    .walletAddress {
      font-size: 10px;
    }
  }

  .walletActions {
    display: flex;
    align-items: center;
    justify-content: center;

    .balanceWrapper {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex-direction: column;
      height: 48px;
    }

    .tokenInfo {
      font-size: 12px;
      color: #aeaeae;
    }

    .infoWrapper {
      font-size: 10px;
      color: red;
      cursor: pointer;

      &.infoWrapperDissabled {
        color: #f88d8d;
        cursor: not-allowed;
      }
    }

    .navigateWrapper {
      position: relative;

      .navigateButton {
        margin-left: 9px;
        margin-right: -18px;
        cursor: pointer;
      }
    }
  }
`
