import React from 'react';
import {Container, makeStyles} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {currentStore} from "../../../stores";
import {Property, Signature} from "@0auth/message";
import {DynamicFormInput} from "../../register";

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
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

export default function Page({children}: LayoutProps) {
  const classes = useStyles();
  const history = useHistory();
  const register = (form: DynamicFormInput[]) => {
    history.push('/register');
    currentStore.setRegister(form);
  };
  const auth = (properties: Property[] | undefined, sign: Signature | undefined) => {
    history.push('/auth');
    if (properties !== undefined) {
      currentStore.setAuth(properties, sign);
    }
  };
  if (chrome.runtime !== undefined && chrome.runtime.onMessage !== undefined) {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      switch (msg.data.type) {
        case 'REGISTER':
          register(msg.data.form as DynamicFormInput[]);
          break;
        case 'AUTH':
          auth(msg.data.properties as Property[], msg.data.sign as Signature);
          break;
        default:
          throw Error('Unreachable Code in onMessage');
      }
    });
  }

  return (
    <Container className={classes.container}>
      {children}
    </Container>
  );
};
