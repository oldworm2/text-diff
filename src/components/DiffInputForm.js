import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Compare from '@material-ui/icons/Compare';
import TextField from '@material-ui/core/TextField';

const DiffInputForm = (props) => {

  return ( 
    <Grid container>
      <Grid xs={12} item>
        <Grid 
          style={{marginTop:15}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={24}
          container>

            <Grid xs={5} item>
              <TextField
                id="textA"
                label="Input Original text"
                multiline
                rows={10}
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={(e) => props.textAChanged(e)}
                onDrop={(e) => props.dropFileA(e)}
                value={props.textA}
              />
            </Grid>
            <Grid xs={5} item>
              <TextField
                id="textB"
                label="Input Changed text"
                multiline
                rows={10}
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={(e) => props.textBChanged(e)}
                onDrop={(e) => props.dropFileB(e)}
                value={props.textB}
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
              <Button onClick={() => props.compare()} variant="contained" size="small" color="primary">
                comppare
                <Compare   color="secondary" style={{ marginLeft: 10 }} />
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
  );
  
}

export default DiffInputForm;