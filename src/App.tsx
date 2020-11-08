import React from 'react';
import { BrowserRouter, Switch, Link, Route, Redirect } from 'react-router-dom';

import {
  LoginPage,
  SettingPage,
  RegisterPage,
  AuthPage,
  MainPage,
} from './components';

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/register">register</Link>
      <Link to="/auth">auth</Link>
      <Switch>
        <Route exact path="/main" component={MainPage}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/settings" component={SettingPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/auth" component={AuthPage} />
        <Redirect from="/" to="/main" />
      </Switch>
    </BrowserRouter>
  );
}
