import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Typography,
  Tabs,
  Tab,
  makeStyles,
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import { PrivatePage } from '../page';
import { HistoryListPage, CurrentLInfoPage, MembershipListPage } from '..';
import { WebsiteInfo } from '../common';
import { currentStore } from '../../stores';

type CurrentInfo = {
  label: string;
  data: string | number;
};

type MainPageProps = {
  currentInfos: Array<CurrentInfo>;
  signature: string;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const useStyles = makeStyles(() => ({
  topWrapper: {
    width: '100%',
    height: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 32,
  },
  bottomWrapper: {
    width: '100%',
    height: 280,
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    backgroundColor: 'transparent',
    '& .MuiTabs-indicator': {
      backgroundColor: '#0076f3',
    },
    '& .Mui-selected': {
      color: '#0076f3',
    },
  },
  tabPanel: {
    width: '100%',
    overflowY: 'scroll',
  },
  seeMore: {
    width: '100%',
    color: '#1976d2',
    fontSize: 12,
    height: 28,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  root: {
    margin: 0,
    padding: 20,
  },
  closeButton: {
    padding: 10,
    color: 'gray',
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

type DialogHeaderProps = {
  onClose: () => void;
};

const DialogHeader = (props: DialogHeaderProps) => {
  const { onClose } = props;
  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dummyMemberships = [
  {
    title: 'Naver',
    favicon:
      'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    signature:
      '048da7b63430eb4db203177baf2e8699a25116561624e67a31c2bf288d54216ce3f6f9c7b81fdbb5732342475a6ee5ccab883277ddbb38fdb79ab5424d401b844a',
    infos: [
      {
        label: 'id',
        data: 'abc1',
      },
      {
        label: 'name',
        data: 'aaa',
      },
      {
        label: 'email',
        data: 'abc@abcd.com',
      },
      {
        label: 'birth',
        data: '2020-01-01',
      },
    ],
  },
  {
    title: 'Kakao',
    favicon: 'https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png',
    signature:
      '048da7b63430eb4db203177baf2e8699a25116561624e67a31c2bf288d54216ce3f6f9c7b81fdbb5732342475a6ee5ccab883277ddbb38fdb79ab5424d401b844a',
    infos: [
      {
        label: 'id',
        data: 'abc1',
      },
      {
        label: 'name',
        data: 'aaa',
      },
      {
        label: 'email',
        data: 'abc@abcd.com',
      },
      {
        label: 'birth',
        data: '2020-01-01',
      },
    ],
  },
  {
    title: 'Google',
    favicon:
      'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png',
    signature:
      '048da7b63430eb4db203177baf2e8699a25116561624e67a31c2bf288d54216ce3f6f9c7b81fdbb5732342475a6ee5ccab883277ddbb38fdb79ab5424d401b844a',
    infos: [
      {
        label: 'id',
        data: 'abc1',
      },
      {
        label: 'name',
        data: 'aaa',
      },
      {
        label: 'email',
        data: 'abc@abcd.com',
      },
      {
        label: 'birth',
        data: '2020-01-01',
      },
    ],
  },
  {
    title: 'Facebook',
    favicon: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico',
    signature:
      '048da7b63430eb4db203177baf2e8699a25116561624e67a31c2bf288d54216ce3f6f9c7b81fdbb5732342475a6ee5ccab883277ddbb38fdb79ab5424d401b844a',
    infos: [
      {
        label: 'id',
        data: 'abc1',
      },
      {
        label: 'name',
        data: 'aaa',
      },
      {
        label: 'email',
        data: 'abc@abcd.com',
      },
      {
        label: 'birth',
        data: '2020-01-01',
      },
    ],
  },
];

const dummyHistoryLogs = [
  {
    type: 'AUTHENTICATION',
    createdAt: '2020-09-01',
    origin: 'https://www.naver.com',
  },
  {
    type: 'REGISTRATION',
    createdAt: '2020-08-31',
    origin: 'https://www.naver.com',
  },
  {
    type: 'AUTHENTICATION',
    createdAt: '2020-07-01',
    origin: 'https://www.kakaocorp.com',
  },
  {
    type: 'REGISTRATION',
    createdAt: '2020-07-01',
    origin: 'https://www.kakaocorp.com',
  },
  {
    type: 'AUTHENTICATION',
    createdAt: '2020-05-01',
    origin: 'https://www.facebook.com',
  },
  {
    type: 'REGISTRATION',
    createdAt: '2020-05-01',
    origin: 'https://www.facebook.com',
  },
  {
    type: 'AUTHENTICATION',
    createdAt: '2020-01-01',
    origin: 'https://www.google.com',
  },
];

export default function MainPage({ currentInfos, signature }: MainPageProps) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PrivatePage>
      <Box className={classes.topWrapper}>
        <WebsiteInfo
          title={currentStore.getTitle()}
          favicon={currentStore.getFavicon()}
          centered={true}
        />
        <CurrentLInfoPage currentInfos={currentInfos} signature={signature} />
      </Box>
      <Box className={classes.bottomWrapper}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          variant="fullWidth"
          centered
        >
          <Tab label="Memberships" {...a11yProps(0)} />
          <Tab label="Logs" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Button
            className={classes.seeMore}
            startIcon={<FullscreenIcon />}
            onClick={handleClickOpen}
          >
            Full Screen
          </Button>
          <Dialog
            open={open}
            fullScreen
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <DialogHeader onClose={handleClose} />
            <MembershipListPage memberships={dummyMemberships} />
          </Dialog>
          <MembershipListPage memberships={dummyMemberships} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Button
            className={classes.seeMore}
            startIcon={<FullscreenIcon />}
            onClick={handleClickOpen}
          >
            Full Screen
          </Button>
          <Dialog
            open={open}
            fullScreen
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <DialogHeader onClose={handleClose} />
            <HistoryListPage histories={dummyHistoryLogs} />
          </Dialog>
          <HistoryListPage histories={dummyHistoryLogs} />
        </TabPanel>
      </Box>
    </PrivatePage>
  );
}
