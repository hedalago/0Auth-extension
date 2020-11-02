import React from 'react';
import {TextField, Box, makeStyles} from '@material-ui/core';

import {BaseButton, WebsiteInfo} from '../common';
import {PrivatePage} from "../page";
import {currentStore} from "../../stores";

// TODO: Should move to 0auth library!
export type DynamicFormInput = {
  type: string;
  label: string;
  required: boolean;
  name?: string;
}

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

export default function RegisterPage() {
  const classes = useStyles();

  return (
    <PrivatePage>
      <WebsiteInfo title={currentStore.getTitle()} favicon={currentStore.getFavicon()} centered={true}/>
      <form className={classes.form}>
        {
          currentStore.form.map(props => {
            const {type, name, label, required} = props;
            const isDateInput = type === 'date';
            const year = new Date().getFullYear();
            const defaultDate = `${year}-01-01`;

            return (
              <Box>
                <TextField
                  className={classes.input}
                  type={type}
                  label={label}
                  defaultValue={isDateInput ? defaultDate : ''}
                  name={name || ''}
                  placeholder={name || ''}
                  required={required || false}/>
              </Box>
            )
          })
        }
        <BaseButton>
          Submit
        </BaseButton>
      </form>
    </PrivatePage>
  );
};
