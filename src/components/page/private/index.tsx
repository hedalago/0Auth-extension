import React from 'react';
import loginStore from '../../../stores/login';
import { Redirect } from 'react-router-dom';
import { Page } from '../index';

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
};

export default function PrivatePage({ children }: LayoutProps) {
  return loginStore.isLogin ? (
    <Page>{children}</Page>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
}
