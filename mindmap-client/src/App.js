import React, {Component} from 'react';
import Graph from "react-graph-vis";

import axios from "./axios-instance"

import logo from './logo.svg';
import classes from './App.module.css';

import DynamicForm from './components/form/form';
import SideNav from './containers/sidenav/sidenav';
import MainContent from './containers/mainContent/mainContent';
import Aux from './containers/aux/aux';

class App extends Component {

  state = {
    graph: null,
    generated: false,
    loading: false
  }

  componentDidMount() {
    // axios.post("api/get_graph_data", {
    //   main: "River",
    //   first_children: ["Ocean", "Strong", "calm", "peaceful"]
    // }).then((response) => {
    //   const data = response.data;
    //   this.setState({ graph: data, generated: true })
    // })
    console.log('Component mounted')
  }

  submitHandler = (formState) => {
    this.setState({ loading: true, generated: false })
    const firstChildren = Object.values(formState.firstChildInputs)
    const data = {
      main: formState.mainNameInput,
      first_children: firstChildren
    }
    axios.post("api/get_graph_data", data)
      .then((response) => {
        const data = response.data;
        this.setState({ graph: data, loading: false, generated: true})
      })
  }

  render() {
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      },
      height: "900px"
    };
   
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };

    let a = (<div>Hello</div>)

    if (this.state.generated) {
      a = <Graph 
            graph={this.state.graph}
            options={options}
            events={events} />
    }
    return (
      <div className={classes.app}>
        <SideNav>
          <div className={classes.title}>
            <h1>mindMap.</h1>
          </div>
          <DynamicForm 
            submitted={this.submitHandler}/>
        </SideNav>
        <MainContent>
          {a}
        </MainContent>
      </div>
    );
  }
}

export default App;
