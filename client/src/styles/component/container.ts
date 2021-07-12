import { Container, withStyles } from "@material-ui/core";

export const StyledContainer = withStyles((theme) => ({
    root: {
        [theme.breakpoints.only("md")]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },
    }
}))(Container)