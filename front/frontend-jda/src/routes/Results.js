import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from '../ProTip';
import Dashboard from '../components/Dashboard.js'
import DashboardPrediction from '../components/DashboardPrediction.js'

export default function Results() {
  return (
    // <Container maxWidth="sm">
    //   <Box my={4}>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Create React App v4-beta example
    //     </Typography>
    //     <ProTip />
    //     <Copyright />
    //   </Box>
    // </Container>

<div>
  <DashboardPrediction/>
</div>
  );
}
