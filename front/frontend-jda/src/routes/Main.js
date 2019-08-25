import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from '../ProTip';
import Dashboard from '../components/Dashboard.js';
import DashboardPrediction from '../components/DashboardPrediction.js';
import Results from './Results';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { textAlign } from '@material-ui/system';

const history = createBrowserHistory();

function onButtonFileUploadClick() {
  history.push('/Results');
  window.location.reload();
}

export default function Main() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h2" align="center" component="h1" gutterBottom>
          Upload a file
        </Typography>
        <div style= {{textAlign : 'center', marginTop : '20%', marginBottom : '20%'}}>
          <InsertDriveFileIcon fontSize='large' onClick={()=>onButtonFileUploadClick()}>
            
          </InsertDriveFileIcon>
        </div>
        <ProTip />
      </Box>
    </Container>

  //<DashboardPrediction />
  );
}