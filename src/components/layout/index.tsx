import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

type LayoutProps = {
    children: JSX.Element[] | JSX.Element
};

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "350px",
        height: "600px",
        border: "1px solid #1976d2",
        borderRadius: "8px",
        padding: 0,
    },
}));

export default function Layout ({ children }: LayoutProps) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            {children}
        </Container>
    );
};
