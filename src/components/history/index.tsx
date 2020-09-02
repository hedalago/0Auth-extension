import React from 'react';
import {
    Avatar,
    Box,
    List, 
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

type History = {
    type: string,
    createdAt: string,
    origin: string,
};

type HistoryListPageProps = {
    histories: Array<History>
};

export default function HistoryListPage ({ histories }: HistoryListPageProps){
    
    return (
        <Box>
            <List>
                {
                    histories.map((history) => {
                        return (
                            <ListItem divider>
                                <ListItemAvatar>
                                    <Avatar>
                                        {
                                            history.type === 'REGISTRATION'
                                                ? <HowToRegIcon />
                                                : <VpnKeyIcon />
                                        }
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={history.type} 
                                    secondary={`${new Date(history.createdAt).toDateString()}  ${history.origin}`} 
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    );
};
