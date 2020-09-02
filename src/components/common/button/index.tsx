import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    button: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#1976d2',
        color:'white',
        '&:hover': {
            backgroundColor: '#0076f3',
        },
        fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
        fontWeight: 'bold',
    }
}))

type ButtonProps = {
    children: string,
    icon?: JSX.Element,
    onClick?: (event: React.MouseEvent<{}>) => void,
}

export default function BaseButton ({ children, icon, onClick }: ButtonProps) {
    const classes = useStyles();

    return (
        <Button
            className={classes.button} 
            variant="contained" 
            size="large"
            endIcon={icon}
            onClick={onClick}
        >
            {children}
        </Button> 
    );
};
