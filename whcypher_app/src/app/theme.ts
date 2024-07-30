import { createMuiTheme } from '@material-ui/core'

import { COLORS } from './componentElements/Colors'

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Cera Pro',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: COLORS.palette.blue,
    },
    secondary: {
      main: '#BFBFBF',
    },
  },
  overrides: {
    MuiButtonGroup: {
      contained: {
        boxShadow: 'none',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 19,
        textTransform: 'none',
        height: 38,
        boxShadow: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
    MuiInput: {
      root: {
        color: '#000',
        backgroundColor: COLORS.palette.white,
        borderRadius: '4px',
        padding: '0px',
        textAlign: 'left',
        background: '#fafafa',
      },
      input: {
        padding: '9px 12px',
        borderRadius: '4px',
        border: `1px solid ${COLORS.palette.grey}`,
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 400,

        '&:hover': {
          border: `1px solid ${COLORS.palette.blue}`,
        },
        '&:focus': {
          border: `1px solid ${COLORS.palette.blue}`,
        },
        '&:disabled': {
          color: COLORS.palette.darkGrey,
          backgroundColor: COLORS.palette.lightGrey,
          border: `1px solid ${COLORS.palette.grey}`,
        },
      },
      error: {
        border: `1px solid ${COLORS.palette.red}`,
      },
      underline: {
        '&:hover': {
          border: 'none',
        },
        '&:before': {
          borderBottom: `none !important`,
        },
        '&:after': {
          borderBottom: `none !important`,
        },
      },
    },

    MuiSelect: {
      icon: {
        fill: COLORS.palette.blue,
        right: '6px',
      },
      select: {
        borderRadius: '4px !important',
        border: `1px solid ${COLORS.palette.grey}`,
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '15px',
        lineHeight: 'initial',
      },
    },
    MuiLinearProgress: {
      bar: {
        borderRadius: 7,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#000',
        color: '#fff',
        padding: 6,
        boxShadow: '0px 0px 19px rgba(72, 97, 206, 0.42)',
        maxWidth: 220,
      },
      popper: {
        marginBottom: -20,
        marginTop: -20,
      },
      arrow: {
        color: '#000',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#252525',
        marginBottom: 3,
        fontWeight: 500,
        fontSize: 16,
      },
    },
    MuiPopover: {
      paper: {
        borderRadius: 8,
      },
    },
    MuiSnackbar: {
      root: {
        minWidth: 300,
      },
    },
  },
})
