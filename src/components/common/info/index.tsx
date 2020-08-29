import React from 'react';
import { Avatar, Container, Typography, makeStyles } from '@material-ui/core';

type WebsiteInfoProps = {
    title: string,
    favicon: string,
};

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 42,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 18,
    }
}));

export default function WebsiteInfo ({ title, favicon }: WebsiteInfoProps) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Avatar className={classes.icon} alt={title} src={favicon} />
            <Typography className={classes.title}>
                {title}
            </Typography>
        </Container>
    );
};
