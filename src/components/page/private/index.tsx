import React from 'react';
import loginStore from "../../../stores/login";
import {Route, Redirect} from "react-router-dom"
import {Container, makeStyles} from "@material-ui/core";

type LayoutProps = {
  children: JSX.Element[] | JSX.Element,
  path: string,
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

export default function PrivatePage({children, path}: LayoutProps) {
  const classes = useStyles();
  return (
    <Route exact path={path} render={() =>
      loginStore.isLogin ?
        <Container className={classes.container}>
          {children}
        </Container>
        :
        <Redirect to={{pathname: '/login'}}/>
    }/>
  )
};
