import { withStyles } from "@material-ui/core";
import React from "react";
import { styles } from "./styles/App.styles";

interface IAppProps {
  readonly classes: any;
}

interface IAppState {
  btnText: string;
  infoText: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      btnText: "Click me",
      infoText: "I am here",
    };
  }

  test(): void {
    console.log("I am here");
  }

  render() {
    const { btnText } = this.state;
    const { classes } = this.props;
    console.log(classes);
    return (
      <div className={classes.app}>
        <h1>Hello, World</h1>
        <button onClick={this.test} value="10">
          {btnText}
        </button>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch: any): any {
//   return {
//     getData: () => dispatch(setData())
//   }
// }

export default withStyles(styles)(App);
