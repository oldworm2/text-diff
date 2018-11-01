import React from 'react';
import Grid from '@material-ui/core/Grid';

const Diff2HtmlView = (props) => {

  return ( 
    <Grid 
    style={{padding: 15}}
    direction="row"
    justify="center"
    alignItems="center"
    container>

      <Grid xs={12} item>
        <div dangerouslySetInnerHTML={{__html:props.outputHtml}}></div>
      </Grid>

    </Grid>
  );
  
}

export default Diff2HtmlView;