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


let jsdiff = require('diff');
let diff2html = require("diff2html").Diff2Html;

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
  },
});

class App extends Component {

  state = {
    inputA: '',
    inputB: '',
    outputHtml: ''
  }

  inputAChanged(event){
    this.setState({
      inputA: event.target.value
    });
  }

  inputBChanged(event){
    this.setState({
      inputB: event.target.value
    });
  }

  compare(){
    let strInput = jsdiff.createPatch('diff', this.state.inputA, this.state.inputB);
    let outputHtml = diff2html.getPrettyHtml(strInput, {inputFormat: 'diff', matching: 'lines', outputFormat: 'line-by-line'});
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
                    id="inputA"
                    label="Input A"
                    multiline
                    rows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.inputAChanged.bind(this)}
                    value={this.state.inputA}
                  />
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    id="inputB"
                    label="Input B"
                    multiline
                    rows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.inputBChanged.bind(this)}
                    value={this.state.inputB}
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
