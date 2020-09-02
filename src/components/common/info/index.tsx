import React from 'react';
import { Avatar, Container, Typography, makeStyles } from '@material-ui/core';

type WebsiteInfoProps = {
    title: string,
    favicon: string,
    centered?: boolean,
};

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        // marginLeft: '5rem',
    },
    title: {
        fontSize: 24,
        fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
        fontWeight: 'bold',
        marginLeft: 16,
    }
}));

export default function WebsiteInfo({ title, favicon, centered }: WebsiteInfoProps) {
    const classes = useStyles();
    

    return (
        <Container className={classes.container} style={ centered ? { justifyContent: "center" } : {}}>
            <Avatar className={classes.icon} alt={title} src={favicon} />
            <Typography className={classes.title} noWrap>
                {title}
            </Typography>
        </Container>
    );
};
