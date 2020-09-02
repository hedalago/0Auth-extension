import React from 'react';
import { 
    Button, 
    Typography, 
    TextField, 
    makeStyles 
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { BaseButton } from '../common';
import Layout from '../layout';

type LoginPageProps = {
    // TODO: specify properties and their types
};

const useStyles = makeStyles(() => ({
    topSpacing: {
        height: 160,
    },
    head: {
        fontWeight: 'bold',
        fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
        color: '#1976d2',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 300,
        height: 240,
    },
    input: {
        width: 270,
        '& label.Mui-focused': {
            color: '#1976d2',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1976d2',
        },
    },
    setPass: {
        color: 'gray',
        textDecoration: 'underline',
        fontSize: 12,
    },
}));

// TODO: specify properties and their types
export default function LoginPage() {
    const classes = useStyles();

    return (
        <Layout>
            <div className={classes.topSpacing} />
            <Typography className={classes.head} variant="h1">
                0auth
            </Typography>
            <form className={classes.form}>
                <TextField className={classes.input} type="password" label="Password" />
                <BaseButton icon={<LockOpenIcon />}>
                    Start 0auth
                </BaseButton>
            </form>
            <Button className={classes.setPass}>Set your password</Button>
        </Layout>
    );
};
