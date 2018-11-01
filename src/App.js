import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';
import TextDiffView from './containers/TextDiffView';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
  },
});

class App extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Text Diff View
              </Typography>
            </Toolbar>
          </AppBar>
          
          <TextDiffView />

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
