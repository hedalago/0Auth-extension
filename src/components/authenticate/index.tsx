import React from 'react';
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

// TODO: Move to 0auth library!
type RequestedInfo = {
  label: string;
  required: boolean;
}

type AuthPageProps = {
  reqInfos: Array<RequestedInfo>;
}

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

export default function AuthPage({reqInfos}: AuthPageProps) {
  const classes = useStyles();

  return (
    <PrivatePage>
      <WebsiteInfo title={currentStore.getTitle()} favicon={currentStore.getFavicon()} centered={true}/>
      <Typography className={classes.text}>
        requested information
      </Typography>
      <Box className={classes.chipWrapper}>
        <div>
          {
            reqInfos.map((i: RequestedInfo) => {
              return (
                <Chip
                  className={classes.chip}
                  key={i.label}
                  label={`${i.label.toLowerCase()}${i.required ? ' *' : ''}`}
                  variant={i.required ? 'default' : 'outlined'}
                />
              )
            })
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
        <BaseButton>Approve</BaseButton>
      </Box>
    </PrivatePage>
  );
};
