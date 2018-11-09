import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Diff2HtmlView from "../components/Diff2HtmlView";
import "../../node_modules/diff2html/dist/diff2html.css";
import { Diff2Html } from "diff2html";
import * as jsdiff from "diff";
import DiffInputForm from "../components/DiffInputForm";

class TextDiffView extends Component {
  state = {
    textA: "",
    textB: "",
    outputHtml: "",
    viewMode: "line-by-line"
  };

  viewModeChanged(event) {
    this.state.outputHtml
      ? this.setState({ viewMode: event.target.value }, () => this.compare())
      : this.setState({
          viewMode: event.target.value
        });
  }

  textAChanged(event) {
    this.setState({
      textA: event.target.value
    });
  }

  textBChanged(event) {
    this.setState({
      textB: event.target.value
    });
  }

  dropFileA(event) {
    event.preventDefault();

    let files = event.dataTransfer.files;

    let file = files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        this.setState({
          textA: evt.target.result
        });
      };
    }
  }

  dropFileB(event) {
    event.preventDefault();
    let files = event.dataTransfer.files;

    let file = files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        this.setState({
          textB: evt.target.result
        });
      };
    }
  }

  compare() {
    let strInput = jsdiff.createPatch(
      "diff",
      this.state.textA,
      this.state.textB
    );
    let outputHtml = Diff2Html.getPrettyHtml(strInput, {
      inputFormat: "diff",
      matching: "lines",
      outputFormat: this.state.viewMode
    });
    this.setState({
      outputHtml: outputHtml
    });
  }

  render() {
    return (
      <Grid container>
        <Grid xs={12} item>
          <DiffInputForm
            textA={this.state.textA}
            textB={this.state.textB}
            viewMode={this.state.viewMode}
            viewModeChanged={this.viewModeChanged.bind(this)}
            textAChanged={this.textAChanged.bind(this)}
            textBChanged={this.textBChanged.bind(this)}
            dropFileA={this.dropFileA.bind(this)}
            dropFileB={this.dropFileB.bind(this)}
            compare={this.compare.bind(this)}
          />
        </Grid>

        <Grid xs={12} item>
          <Diff2HtmlView outputHtml={this.state.outputHtml} />
        </Grid>
      </Grid>
    );
  }
}

export default TextDiffView;
