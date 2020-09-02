import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { getProjectsQuery } from '../queries/queries';
import  ProjectDetails from './ProjectDetails';

class ProjectList extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null
        }
    }
    displayProjects(){
        let data = this.props.data
        if(data.loading){
            return (<div>Loading Projects...</div>)
        }else{
            return data.projects.map(project => {
                return (
                    <li key={project.id} onClick={(e)=> {this.setState({ selected: project.id })}}>{project.name}</li>
                )
            })
        }
    }
    render() {
        return (
            <div id="project-list">
              <ul>
                {this.displayProjects()} 
              </ul>
                <ProjectDetails projectId={this.state.selected}/>
            </div>
        )
    }
}
export default graphql(getProjectsQuery)(ProjectList);