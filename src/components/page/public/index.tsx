import React from 'react';
import {Container, makeStyles} from '@material-ui/core';
import {Route} from "react-router-dom";

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
  path: string;
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

export default function Page({children, path}: LayoutProps) {
  const classes = useStyles();
  return (
    <Route path={path} exact render={() =>
      <Container className={classes.container}>
        {children}
      </Container>
    }/>
  );
};
