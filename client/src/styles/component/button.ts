import { Button, withStyles } from "@material-ui/core";

export const StyledButton = withStyles({
    root: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1.2rem',
        paddingRight: '1.2rem',
    },
})(Button)