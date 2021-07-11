import { createTheme, Theme } from '@material-ui/core/styles'
import { Shadows } from '@material-ui/core/styles/shadows'

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#0137FF',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#FC572E',
            contrastText: '#FFFFFF'
        },
        success: {
            main: '#328C4E',
            contrastText: '#FFFFFF'
        },
        error: {
            main: '#FC572E',
            contrastText: '#FFFFFF'
        },
        common: {
            black: '#3A3B41'
        },
        background: {
            default: '#F7F6FD'
        }
    },
    shape: {
        borderRadius: 7,
    },
    shadows: Array(25).fill("none") as Shadows
})