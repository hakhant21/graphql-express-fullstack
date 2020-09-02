import { gql } from 'apollo-boost'



const getProjectsQuery = gql`
    {
        projects {
            name
            id
        }
    }
`



const getCategoriesQuery = gql`
{
    categories {
        name
        id
    }
}
`
const addProjectMutation = gql`
    mutation($name: String!,$task: String!,$completed: Boolean!,$categoryId: ID!){
        addProject(name: $name, task: $task, completed: $completed, categoryId: $categoryId){
            id
            name
        }
    }

`
const getProjectQuery = gql`
    query($id: ID){
        project(id: $id){
            id
            name
            task
            completed
            category{
                id
                name
                projects{
                    name 
                    id
                }
            }
        }
    }

`

export { getCategoriesQuery, getProjectsQuery, addProjectMutation, getProjectQuery}