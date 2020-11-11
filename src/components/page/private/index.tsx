import React from 'react';
import { Redirect } from 'react-router-dom';
import loginStore from '../../../stores/login';
import { Page } from '../index';

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
};

export default function PrivatePage({ children }: LayoutProps): JSX.Element {
  return loginStore.isLogin ? (
    <Page>{children}</Page>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
