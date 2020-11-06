import React, {useCallback} from 'react';
import {
  Box,
  Button,
  Chip,
  Typography,
  makeStyles
} from '@material-ui/core';

import {WebsiteInfo, BaseButton} from '../common';
import {PrivatePage} from '../page';
import {currentStore} from "../../stores";
import {Property} from "@0auth/message";

const useStyles = makeStyles(() => ({
  chipWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    margin: 4,
    fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
    fontWeight: 'bold',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    height: '15%',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
    color: 'white',
    '&:hover': {
      backgroundColor: '#5e5e5e',
    },
    fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
    fontWeight: 'bold',
  },
  text: {
    marginTop: 28,
    marginBottom: 28,
    fontSize: 18,
    fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
  }
}));

export default function AuthPage() {
  const classes = useStyles();
  const approveHandler = useCallback((e: React.MouseEvent<{}, MouseEvent>) => {
    e.preventDefault();
    currentStore.auth();
  }, []);

  return (
    <PrivatePage>
      <WebsiteInfo title={currentStore.getTitle()} favicon={currentStore.getFavicon()} centered={true}/>
      <Typography className={classes.text}>
        requested information
      </Typography>
      <Box className={classes.chipWrapper}>
        <div>
          {
            currentStore.properties.map((property: Property) => (
              <Chip
                className={classes.chip}
                key={property.key}
                label={`${property.key.toLowerCase()}*`}
                variant='default'
              />
            ))
          }
        </div>
      </Box>
      <Typography className={classes.text}>
        as above for authentication.
        <br/>
        Would you like to approve?
      </Typography>
      <Box className={classes.buttonWrapper}>
        <Button className={classes.button} variant="contained" size="large">Decline</Button>
        <BaseButton onClick={approveHandler}>Approve</BaseButton>
      </Box>
    </PrivatePage>
  );
};
