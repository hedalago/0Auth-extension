import React from 'react';
import { TextField, Box, makeStyles } from '@material-ui/core';

import { BaseButton, WebsiteInfo } from '../common';
import Layout from '../layout';

type DynamicFormInput = {
    type: string,
    label: string,
    required: boolean,
    name?: string,
    placeholder?: string,
}

type RegisterPageProps = {
    favicon: string,
    title: string,
    dynamicFormInputs: DynamicFormInput[],
};

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 320,
        height: '70%',
        overflow: 'auto'
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
}));

export default function RegisterPage({ title, favicon, dynamicFormInputs }: RegisterPageProps) {
    const classes = useStyles();

    return (
        <Layout>
            <WebsiteInfo title={title} favicon={favicon} centered={true} />
            <form className={classes.form}>
                {
                    dynamicFormInputs.map(props => {
                        const { type, name, label, placeholder, required } = props;
                        const isDateInput = type === 'date';
                        const year = new Date().getFullYear();
                        const defaultDate = `${year}-01-01`

                        return (
                            <Box>
                                <TextField 
                                    className={classes.input}
                                    type={type}
                                    label={label}
                                    defaultValue={isDateInput ? defaultDate : ''}
                                    name={name || ''}
                                    placeholder={placeholder || ''}
                                    required={required || false}
                                />
                            </Box>
                        )
                    })
                }
                <BaseButton>
                    Submit
                </BaseButton>
            </form>
        </Layout>
    );
};
