import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';



// Components
import ProjectList from './components/ProjectList'
import AddProject from './components/AddProject'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})



class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <h1>Project List</h1>
        <ProjectList />
        <AddProject />
      </div>
      </ApolloProvider>

    )
  }
}

export default App;
