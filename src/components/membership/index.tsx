import React, {useState} from 'react';
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
  makeStyles
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {WebsiteInfo} from '../common';

type RegistrationInfo = {
  label: string,
  data: string | number,
};

type Membership = {
  title: string,
  favicon: string,
  signature: string,
  infos: Array<RegistrationInfo>,
};

type MembershipListPageProps = {
  memberships: Array<Membership>,
};

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

export default function MembershipListPage({memberships}: MembershipListPageProps) {
  const classes = useStyles();
  const [openId, setOpenId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = (id: string) => {
    setOpenId(id);
  };

  const handleClose = () => {
    setOpenId(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <Box className={classes.wrapper}>
      <List component="nav">
        {
          memberships.map((membership, index) => {
            const id = `${index}-${membership.title}`;
            return (
              <span key={membership.title}>
                <ListItem className={classes.listItem} button divider
                          onClick={() => handleClickOpen(id)}>
                  <WebsiteInfo title={membership.title} favicon={membership.favicon}/>
                  <ListItemIcon>
                      <ChevronRightIcon/>
                  </ListItemIcon>
                </ListItem>
                <Dialog
                  keepMounted
                  open={id === openId}
                  onClose={handleClose}
                  classes={{paper: classes.dialog}}
                  style={{backgroundColor: 'transparent'}}
                  BackdropProps={{
                    classes: {
                      root: classes.backDrop,
                    }
                  }}
                >
                  <DialogTitle
                    id={`${membership.title}-dialog-title`}>{membership.title}</DialogTitle>
                  <DialogContent>
                      {
                        membership.infos.map((i) => {
                          return (
                            <Typography key={i.label} className={classes.text}>
                              {i.label.toLowerCase()} : {i.data}
                            </Typography>
                          )
                        })
                      }
                    <Typography
                      className={classes.text}
                      aria-owns={id === openId ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      noWrap
                    >
                          sign : 0x{membership.signature}
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
                      disableRestoreFocus>
                      <Typography className={classes.popoverText}>
                          0x{membership.signature}
                      </Typography>
                    </Popover>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} className={classes.closeButton} autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </span>
            )
          })
        }
      </List>
    </Box>
  );
};
