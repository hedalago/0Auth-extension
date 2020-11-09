import React from 'react';
import {Container, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {currentStore, historyStore, propertyStore} from "../../../stores";
import {DynamicFormInput} from "@0auth/client";
import {Property, Signature} from "@0auth/message";

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
    height: "584px",
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
    historyStore.addHistory(currentStore.host!, 'REGISTRATION');
  };
  const auth = (host: string | undefined) => {
    history.push('/auth');
    if (host !== undefined) {
      currentStore.setAuth(host);
      historyStore.addHistory(host, 'AUTHENTICATE');
    }
  };
  const sign = (host: string, title: string, favicon: string, properties: Property[], sign: Signature) => {
    history.push('/');
    propertyStore.updateProperties(host, title, favicon, properties, sign);
  };
  if (currentStore.checkMessageQueue()) {
    const msg = currentStore.popMessage();
    console.log(msg);
    switch (msg.type) {
      case 'REGISTER':
        register(msg.form as DynamicFormInput[]);
        break;
      case 'AUTH':
        auth(msg.host as string);
        break;
      case 'SIGN':
        sign(
          msg.host as string,
          msg.title as string,
          msg.favicon as string,
          msg.properties as Property[],
          msg.sign as Signature,
        );
        break;
      default:
        throw Error('Unreachable Code in onMessage');
    }
  }
  // if (chrome.runtime !== undefined && chrome.runtime.onMessage !== undefined) {
  //   chrome.runtime.onMessage.addListener((msg, _sender, _response) => {
  //     switch (msg.data.type) {
  //       case 'REGISTER':
  //         register(msg.data.form as DynamicFormInput[]);
  //         break;
  //       case 'AUTH':
  //         auth(msg.data.host as string);
  //         break;
  //       case 'SIGN':
  //         sign(
  //           msg.data.host as string,
  //           msg.data.title as string, msg.data.favicon as string,
  //           msg.data.properties as Property[],
  //           msg.data.sign as Signature,
  //         );
  //         break;
  //       default:
  //         throw Error('Unreachable Code in onMessage');
  //     }
  //   });
  // }

  return (
    <Container className={classes.container}>
      {children}
    </Container>
  );
};
