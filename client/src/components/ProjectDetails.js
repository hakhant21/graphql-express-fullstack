import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { getProjectQuery } from '../queries/queries';

class ProjectDetails extends Component {
    displayProjectDetails(){
        const { project } = this.props.data
        if(project){
            return(
                <div>
                    <h2>Name : {project.name}</h2>
                    <p>Task : {project.task}</p>
                    <p>Category Name : {project.category.name}</p>
                    <p>Complete: {project.completed === true ? 'Completed' : "InComplete"}</p>
                    <p>All Projects in this Categories</p>
                    <ul>
                        {project.category.projects.map(item => {
                            return (<li key={item.id}>{item.name}</li>)
                        })}
                    </ul>
                </div>
            )
        }else{
           return( <div>No Book Selected...</div>)
        }
    }
    render() {
        return (
            <div id="project-details">
                <p>Project Details Go Here</p>
                {this.displayProjectDetails()}
            </div>
        )
    }
}

export default graphql(getProjectQuery,{
    options: (props) => {
        return {
            variables: {
                id: props.projectId
            }
        }
    }
})(ProjectDetails);