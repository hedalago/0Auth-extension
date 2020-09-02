import React, { useState } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    Popover, 
    makeStyles 
} from '@material-ui/core';

type CurrentInfo = {
    label: string,
    data: string | number,
};

type CurrentInfoPageProps = {
    currentInfos: Array<CurrentInfo>,
    signature: string,
};

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: 240,
        overflow: 'auto',
    },
    popover: {
        pointerEvents: 'none',
    },
    popoverText: {
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    text: {
        color: '#3e3e3e',
        fontFamily: ['"Noto Sans"', 'sans-serif'].join(','),
        marginTop: 6,
        marginBottom: 6,
    },
}));

export default function CurrentInfoPage({ currentInfos, signature }: CurrentInfoPageProps) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Container className={classes.container}>
            <Typography className={classes.title}>
                Current page info
            </Typography>
            {
                currentInfos.map((i) => {
                    return (
                        <Typography className={classes.text}>
                            {i.label.toLowerCase()} : {i.data}
                        </Typography>
                    )
                })
            }
            <Box>
                <Typography
                    className={classes.text}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    noWrap
                >
                    sign : 0x{signature}
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    open={open}
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
                        0x{signature}
                    </Typography>
                </Popover>
            </Box>
        </Container>
    );
};
