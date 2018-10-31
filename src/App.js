import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Compare from '@material-ui/icons/Compare';
import TextField from '@material-ui/core/TextField';

import '../node_modules/diff2html/dist/diff2html.css';
import {Diff2Html} from 'diff2html'
import * as jsdiff from 'diff';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
  },
});

class App extends Component {

  state = {
    textA: '',
    textB: '',
    outputHtml: ''
  }

  textAChanged(event){
    this.setState({
      textA: event.target.value
    });
  }

  textBChanged(event){
    this.setState({
      textB: event.target.value
    });
  }

  compare(){
    let strInput = jsdiff.createPatch('diff', this.state.textA, this.state.textB);
    let outputHtml = Diff2Html.getPrettyHtml(strInput, {inputFormat: 'diff', matching: 'lines', outputFormat: 'line-by-line'});
    this.setState({
      outputHtml: outputHtml
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Text Diff
              </Typography>
            </Toolbar>
          </AppBar>
          
          <Grid container>
            <Grid xs={12} item>

              <Grid 
              style={{marginTop:15}}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={24}
              container>

                <Grid xs={4} item>
                  <TextField
                    id="textA"
                    label="Input text"
                    multiline
                    rows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.textAChanged.bind(this)}
                    value={this.state.textA}
                  />
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    id="textB"
                    label="Input text"
                    multiline
                    rows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.textBChanged.bind(this)}
                    value={this.state.textB}
                  />
                </Grid>
                

              </Grid>

              <Grid 
              style={{marginTop:15}}
              direction="row"
              justify="center"
              alignItems="center"
              container>

                <Grid item>
                  <Button onClick={() => this.compare()} variant="contained" size="small" color="primary">
                    comppare
                    <Compare   color="secondary" style={{ marginLeft: 10 }} />
                  </Button>
                </Grid>

              </Grid>

              <Grid 
              style={{padding: 15}}
              direction="row"
              justify="center"
              alignItems="center"
              container>

                <Grid xs={12} item>
                  <div dangerouslySetInnerHTML={{__html:this.state.outputHtml}}></div>
                </Grid>

              </Grid>
            </Grid>
          </Grid>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
