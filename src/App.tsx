import React from 'react';

import { LoginPage, RegisterPage } from './components';

export default function App() {
  const dummyData = {
    title: 'Naver',
    favicon: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    inputs: [
      {
        type: 'text',
        name: 'user-id',
        label: 'Id',
      },
      {
        type: 'email',
        name: 'user-email',
        label: 'E-mail'
      },
      {
        type: 'password',
        name: 'user-password',
        label: 'Password'
      },
      {
        type: 'date',
        name: 'user-birth',
        label: 'Birth'
      }
    ]
  }
  return (
    <div className="App">
      <LoginPage />
     <RegisterPage favicon={dummyData.favicon} title={dummyData.title} dynamicFormInputs={dummyData.inputs} />
    </div>
  );
};
