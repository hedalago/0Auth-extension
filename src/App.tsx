import React from 'react';

import { LoginPage, RegisterPage, AuthPage } from './components';

export default function App() {
  const dummyData = {
    title: 'Naver',
    favicon: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    inputs: [
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
    ]
  }
  return (
    <div className="App">
      <LoginPage />
     <RegisterPage favicon={dummyData.favicon} title={dummyData.title} dynamicFormInputs={dummyData.inputs} />
     <AuthPage favicon={dummyData.favicon} title={dummyData.title} reqInfos={dummyData.reqInfos} />
    </div>
  );
};
