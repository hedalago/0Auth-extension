import React from 'react';

import {LoginPage, SettingPage, RegisterPage, AuthPage, MainPage} from './components';
import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom";

export default function App() {
  const dummyData = {
    title: 'Naver',
    favicon: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    formInputs: [
      {
        type: 'text',
        name: 'user-id',
        label: 'Id',
        required: true,
      },
      {
        type: 'email',
        name: 'user-email',
        label: 'E-mail',
        required: true,
      },
      {
        type: 'password',
        name: 'user-password',
        label: 'Password',
        required: true,
      },
      {
        type: 'date',
        name: 'user-birth',
        label: 'Birth',
        required: true,
      }
    ],
    reqInfos: [
      {
        label: 'Id',
        required: true,
      },
      {
        label: 'E-mail',
        required: true,
      },
      {
        label: 'Password',
        required: true,
      },
      {
        label: 'Birth',
        required: true,
      }
    ],
    currentInfos: [
      {
        label: 'Id',
        data: 'abcd',
      },
      {
        label: 'E-mail',
        data: 'abcd@gmail.com'
      },
      {
        label: 'Password',
        data: '12345',
      },
      {
        label: 'Birth',
        data: '2000-01-01',
      }
    ],
    signature: '048da7b63430eb4db203177baf2e8699a25116561624e67a31c2bf288d54216ce3f6f9c7b81fdbb5732342475a6ee5ccab883277ddbb38fdb79ab5424d401b844a',
  };

  return (
    <BrowserRouter>
      <Link to='/register'>register</Link>
      <Link to='/auth'>auth</Link>
      <Switch>
        <Route exact path='/main' render={() =>
          <MainPage
            currentInfos={dummyData.currentInfos}
            signature={dummyData.signature}/>}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/settings' component={SettingPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/auth' component={AuthPage}/>
        <Redirect from='/' to='/main'/>
      </Switch>
    </BrowserRouter>
  );
};
