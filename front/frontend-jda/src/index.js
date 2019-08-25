import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Main from './routes/Main';
import Results from './routes/Results'
import { BrowserRouter as Router, Route} from "react-router-dom";
import theme from './theme';

const routing = (
    <Router>
      <div>
        <Route path="/Main" component={Main} />
        <Route path="/Results" component={Results} />
      </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
