import React, { useCallback } from 'react';
import { TextField, Box, makeStyles } from '@material-ui/core';
import { defaultValue } from '@0auth/message/lib/type/defaultValue';

import { useHistory } from 'react-router-dom';
import { BaseButton, WebsiteInfo } from '../common';
import { PrivatePage } from '../page';
import { currentStore } from '../../stores';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 320,
    height: '70%',
    overflow: 'auto',
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

export default function RegisterPage(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const submitHandler = useCallback((e: React.MouseEvent<{}, MouseEvent>) => {
    e.preventDefault();
    currentStore.register();
    window.close();
  }, []);

  return (
    <PrivatePage>
      <WebsiteInfo
        title={currentStore.getTitle()}
        favicon={currentStore.getFavicon()}
        centered
      />
      <form className={classes.form}>
        {currentStore.form.map((currentInput, i) => {
          const { type, name, label } = currentInput;
          return (
            <Box>
              <TextField
                className={classes.input}
                type={type}
                label={label}
                defaultValue={defaultValue(type)}
                name={name}
                placeholder={label}
                onChange={(e) => currentStore.changeProperty(i, e.target.value)}
                required
              />
            </Box>
          );
        })}
        <BaseButton onClick={submitHandler}>Submit</BaseButton>
      </form>
    </PrivatePage>
  );
}
