import React, { useState } from 'react';
import { 
    Box, 
    Button,
    Typography, 
    Tabs, 
    Tab, 
    makeStyles
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import Layout from '../layout';
import { HistoryListPage, CurrentLInfoPage, MembershipListPage } from '..';
import { WebsiteInfo } from '../common';

type CurrentInfo = {
    label: string,
    data: string,
};

type MainPageProps = {
    title: string,
    favicon: string,
    currentInfos: Array<CurrentInfo>,
    signature: string,
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
    seeMore: {
        width: '100%',
        color: '#1976d2',
        fontSize: 12,
        height: 28,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
};

function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
};

export default function MainPage({ title, favicon, currentInfos, signature }: MainPageProps) {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    return (
        <Layout>
            <Box className={classes.topWrapper}>
                <WebsiteInfo title={title} favicon={favicon} />
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
                    <Button className={classes.seeMore} startIcon={<FullscreenIcon />}>
                        Full Screen
                    </Button>
                    <MembershipListPage />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Button className={classes.seeMore} startIcon={<FullscreenIcon />}>
                        Full Screen
                    </Button>
                    <HistoryListPage />
                </TabPanel>
            </Box>
        </Layout>
    );
};
