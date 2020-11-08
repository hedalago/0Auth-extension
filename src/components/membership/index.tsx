import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  Popover,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { WebsiteInfo } from '../common';
import {propertyStore} from "../../stores";

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dialog: {
    width: 320,
    height: 540,
    boxShadow: 'none',
  },
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverText: {
    padding: 10,
  },
  text: {
    color: '#3e3e3e',
    fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
    marginTop: 6,
    marginBottom: 6,
  },
  closeButton: {
    color: '#0076f3',
  },
}));

export default function MembershipListPage() {
  const classes = useStyles();
  const [openHost, setOpenHost] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = (id: string) => {
    setOpenHost(id);
  };

  const handleClose = () => {
    setOpenHost(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <Box className={classes.wrapper}>
      <List component="nav">
        {propertyStore.hostList.map((host) => {
          return (
            <span key={propertyStore.properties[host].title}>
              <ListItem
                className={classes.listItem}
                button
                divider
                onClick={() => handleClickOpen(host)}
              >
                <WebsiteInfo
                  title={propertyStore.properties[host].title}
                  favicon={propertyStore.properties[host].favicon}
                />
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItem>
              <Dialog
                keepMounted
                open={host === openHost}
                onClose={handleClose}
                classes={{ paper: classes.dialog }}
                style={{ backgroundColor: 'transparent' }}
                BackdropProps={{
                  classes: {
                    root: classes.backDrop,
                  },
                }}
              >
                <DialogTitle id={`${propertyStore.properties[host].title}-dialog-title`}>
                  {propertyStore.properties[host].title}
                </DialogTitle>
                <DialogContent>
                  {propertyStore.properties[host].property.map((property) => {
                    return (
                      <Typography key={property.key} className={classes.text}>
                        {property.key.toLowerCase()} : {property.value}
                      </Typography>
                    );
                  })}
                  <Typography
                    className={classes.text}
                    aria-owns={host === openHost ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    noWrap
                  >
                    sign : 0x{propertyStore.properties[host].sign.value}
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography className={classes.popoverText}>
                      0x{propertyStore.properties[host].sign.value}
                    </Typography>
                  </Popover>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    className={classes.closeButton}
                    autoFocus
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </span>
          );
        })}
      </List>
    </Box>
  );
}
