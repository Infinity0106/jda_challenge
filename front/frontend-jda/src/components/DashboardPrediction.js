import React from 'react';
import clsx from 'clsx';
import '../pure-min.css';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Button from '@material-ui/core/Button';
import Papa from 'papaparse'
import { test } from '../scripts/test.csv';
import saveAs from 'file-saver';
import PaginationTable from './PaginationTable';

var globalResults = "";

function parseData(url, callBack) {
  Papa.parse(url, {
      download: true,
      dynamicTyping: true,
      header: true, 
      complete: function(results) {
          callBack(results.data);
      }
  });
}

var results = "";
function parseCSV(){
  const fs = require('fs'); 
  const papa = require('papaparse');
  var fileToParse = require("../scripts/test.csv");
  var results = [];
  parseMe(fileToParse, doStuff);
  //console.log("test2",globalResults);
  // var blob = new Blob([results], {type: "text/plain;charset=utf-8"});
  // saveAs(results, "aa.json");
  console.log('(Log no.2) After parse call but before complete fired, newArray:', results, new Date()); //log no. 2
}

function parseMe(url, callBack){
  Papa.parse(url, { header:true,
      complete: function(results) {
      callBack(results.data[0]);
      }
  });
}

function doStuff(data){
  // NOTE: this throws an Error in strict mode:
  //console.log('after stuff done, new Array is:', newArray);
    var newArray=data;
    console.log('(Log no.1) In OnComplete callback, Array is:', data); //log no. 1
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Luis Castro '}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* <Grid container spacing={3}>
            { Chart }
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            { Recent Deposits }
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            { Recent Orders }
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid> */}
          <Button onClick={()=>parseCSV()}>
            Parse File
          </Button>
          <PaginationTable/>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
