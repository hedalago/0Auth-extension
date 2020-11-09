import React, {useState} from 'react';
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
import {TransitionProps} from '@material-ui/core/transitions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import {PrivatePage} from '../page';
import {HistoryListPage, CurrentLInfoPage, MembershipListPage} from '..';
import {WebsiteInfo} from '../common';
import {currentStore} from '../../stores';

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
  const {children, value, index, ...other} = props;
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
  const {onClose} = props;
  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon/>
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

export default function MainPage() {
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
        {
          currentStore.host !== undefined ? <CurrentLInfoPage/> : ''
        }
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
            startIcon={<FullscreenIcon/>}
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
            <DialogHeader onClose={handleClose}/>
            <MembershipListPage/>
          </Dialog>
          <MembershipListPage/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Button
            className={classes.seeMore}
            startIcon={<FullscreenIcon/>}
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
            <DialogHeader onClose={handleClose}/>
            <HistoryListPage/>
          </Dialog>
          <HistoryListPage/>
        </TabPanel>
      </Box>
    </PrivatePage>
  );
}
