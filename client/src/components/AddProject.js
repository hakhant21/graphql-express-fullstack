import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import { getCategoriesQuery, addProjectMutation,getProjectsQuery } from '../queries/queries'

class AddProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            task: "",
            completed: true,
            categoryId: ""
        }
    }
    displayCategories(){
        let data = this.props.getCategoriesQuery;
        if(data.loading){
            return (<option disabled>Loading Categories</option>)
        }else{
            return data.categories.map(category =>{
                return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                )
            })
        }
    }
    submitForm (e){
        e.preventDefault();
        this.props.addProjectMutation({
            variables: {
                name: this.state.name,
                task: this.state.task,
                completed: !this.state.completed,
                categoryId: this.state.categoryId
            },
            refetchQueries: [{query: getProjectsQuery}]
        })
    }
    render() {
        return (
            <form id="add-project" onSubmit={this.submitForm.bind(this)}>
                <div className='field'>
                    <label>Project Name</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
                </div>
                <div className='field'>
                    <label>Project's Task</label>
                    <input type="text" onChange={(e) => this.setState({ task: e.target.value })}/>
                </div>
                <div className="field">
                    <label>Completed Task</label>
                    <input type="checkbox" onChange={(e) => this.setState({completed: e.target.value })}/>
                </div>
                <div className='field'>
                <label>Category</label>
                <select onChange={(e) => this.setState({ categoryId: e.target.value })}>
                    <option>Select Category</option>
                    {this.displayCategories()}
                </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
    graphql(addProjectMutation,{name: "addProjectMutation"})
)(AddProject);
