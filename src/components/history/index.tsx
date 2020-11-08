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
import {currentStore, historyStore} from "../../stores";

export default function HistoryListPage() {
  return (
    <Box>
      <List>
        {historyStore.history(currentStore.host).map((history) => {
          return (
            <ListItem divider>
              <ListItemAvatar>
                <Avatar>
                  {history.type === 'REGISTRATION' ? (
                    <HowToRegIcon />
                  ) : (
                    <VpnKeyIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={history.type}
                secondary={`${new Date(history.createdAt).toDateString()}  ${
                  history.host
                }`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
