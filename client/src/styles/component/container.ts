import { Grid, withStyles } from "@material-ui/core";

export const Container = withStyles({
    root: {
        maxWidth: '1000px', 
        margin: '0 auto', 
        paddingLeft: '10px', 
        paddingRight: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    }
})(Grid)