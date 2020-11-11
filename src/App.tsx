import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import {
  LoginPage,
  SettingPage,
  RegisterPage,
  AuthPage,
  MainPage,
} from './components';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/settings" component={SettingPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/auth" component={AuthPage} />
        <Redirect from="/" to="/main" />
      </Switch>
    </BrowserRouter>
  );
}
