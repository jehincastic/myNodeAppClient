import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SignOut from "@material-ui/icons/PowerSettingsNew";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ConfirmationNumberSharpIcon from '@material-ui/icons/ConfirmationNumberSharp';
import HelpSharpIcon from '@material-ui/icons/HelpSharp';
import Timeline from '@material-ui/icons/Timeline';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    link: {
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.87)"
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    formControl: {
        margin: "10px",
        minWidth: 160
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    btnAdd: {
        marginTop: "25px"
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    listItems: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    container: {
        display: "flex",
        flexDirection: "column"
    }
}));

const Nav = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openSub1, setOpenSub1] = React.useState(false);
    const [openSub2, setOpenSub2] = React.useState(false);
    const [openSub3, setOpenSub3] = React.useState(false);
    // const [openSub4, setOpenSub4] = React.useState(false);
    // const [openSub5, setOpenSub5] = React.useState(false);

    const handleClick1 = () => {
        setOpenSub1(!openSub1);
        if (openSub2) {
            setOpenSub2(!openSub2);
        }
        if (openSub3) {
            setOpenSub3(!openSub3);
        }
        // if (openSub4) {
        //     setOpenSub4(!openSub4);
        // }
        // if (openSub5) {
        //     setOpenSub5(!openSub5);
        // }
    };

    const handleClick2 = () => {
        setOpenSub2(!openSub2);
        if (openSub1) {
            setOpenSub1(!openSub1);
        }
        if (openSub3) {
            setOpenSub3(!openSub3);
        }
        // if (openSub4) {
        //     setOpenSub4(!openSub4);
        // }
        // if (openSub5) {
        //     setOpenSub5(!openSub5);
        // }
    };

    const handleClick3 = () => {
        setOpenSub3(!openSub3);
        if (openSub1) {
            setOpenSub1(!openSub1);
        }
        if (openSub2) {
            setOpenSub2(!openSub2);
        }
        // if (openSub4) {
        //     setOpenSub4(!openSub4);
        // }
        // if (openSub5) {
        //     setOpenSub5(!openSub5);
        // }
    };

    // const handleClick4 = () => {
    //     setOpenSub4(!openSub4);
    //     if (openSub1) {
    //         setOpenSub1(!openSub1);
    //     }
    //     if (openSub2) {
    //         setOpenSub2(!openSub2);
    //     }
    //     if (openSub3) {
    //         setOpenSub3(!openSub3);
    //     }
    //     if (openSub5) {
    //         setOpenSub5(!openSub5);
    //     }
    // };

    // const handleClick5 = () => {
    //     setOpenSub5(!openSub5);
    //     if (openSub1) {
    //         setOpenSub1(!openSub1);
    //     }
    //     if (openSub2) {
    //         setOpenSub2(!openSub2);
    //     }
    //     if (openSub3) {
    //         setOpenSub3(!openSub3);
    //     }
    //     if (openSub4) {
    //         setOpenSub5(!openSub4);
    //     }
    // };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        TASK TRACK
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <Link className={classes.link} to="/dashboard">
                        <ListItem button>
                            <ListItemText primary="TASK TRACK" />
                        </ListItem>
                    </Link>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.listItems}>
                    <List>
                        <ListItem button onClick={handleClick1}>
                            <ListItemIcon>
                                <Timeline />
                            </ListItemIcon>
                            <ListItemText primary="Timesheets" />
                            {openSub1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openSub1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link
                                    className={classes.link}
                                    to="/timesheet"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Enter Timesheet" />
                                    </ListItem>
                                </Link>
                                <Link
                                    className={classes.link}
                                    to="/search-timesheet"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Search Timesheet" />
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleClick2}>
                            <ListItemIcon>
                                <ConfirmationNumberSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tickets" />
                            {openSub2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openSub2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link
                                    className={classes.link}
                                    to="/assigned-tickets"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Assigned Tickets" />
                                    </ListItem>
                                </Link>
                                <Link
                                    className={classes.link}
                                    to="/create-ticket"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Create New Ticket" />
                                    </ListItem>
                                </Link>
                                <Link
                                    className={classes.link}
                                    to="/ticket"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Search Ticket" />
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleClick3}>
                            <ListItemIcon>
                                <HelpSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Request" />
                            {openSub3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openSub3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link
                                    className={classes.link}
                                    to="/assigned-request"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Assigned Request" />
                                    </ListItem>
                                </Link>
                                <Link
                                    className={classes.link}
                                    to="/create-request"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Create New Request" />
                                    </ListItem>
                                </Link>
                                <Link
                                    className={classes.link}
                                    to="/request"
                                >
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Search Request" />
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                    </List>
                    <List>
                        <Link className={classes.link} to="/logout">
                            <ListItem button>
                                <ListItemIcon>
                                    <SignOut />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                {props.display}
            </main>
        </div>
    );
};

export default Nav;
