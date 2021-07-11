import { makeStyles } from '@material-ui/core'

interface Props {
    onClick: any,
    active: boolean,
}

const Hamburger = ( { onClick, active }: Props ) => {
    const classes = useStyles()

    return (
        <div className={`${classes.menu} ${active && 'active'}`} onClick={onClick}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Hamburger

const useStyles = makeStyles(theme => ({
    menu: {
        '&.active': {
            '& div:nth-child(1)': {
                transform: 'translateY(10px) rotate(45deg)',
            },
            '& div:nth-child(2)': {
                visibility: 'hidden'
            },
            '& div:nth-child(3)': {
                transform: 'translateY(-10px) rotate(135deg)'  
            },
        },
        '&:hover': {
            cursor: 'pointer',
            '&:hover div': {
                backgroundColor: theme.palette.primary.main
            }
        },
        '& div': {
            backgroundColor: theme.palette.common.black,
            height: 4,
            width: 35,
            margin: 6,
            borderRadius: 50,
            transition: 'all 250ms ease-out',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    },
}))
