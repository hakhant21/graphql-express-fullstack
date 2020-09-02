const {
    GraphQLID,
    GraphQLSchema,
    GraphQLString,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
}= require('graphql');

// Models || Schema
const Category = require('../models/Category');
const Project = require('../models/Project');

// Category Type
const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find({categoryId: parent.id})
            }
        }
    })
});

//Project Type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        task: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        category: {
            type: CategoryType,
            resolve(parent,args){
                return Category.findById(parent.categoryId)
            }
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
       category: {
         type: CategoryType,
         args: { id: { type: GraphQLID }},
         resolve(parent, args){
             // code to get data from database
             return Category.findById(args.id)
         }
       },
      project: {
           type: ProjectType,
           args: { id: { type: GraphQLID }},
           resolve(parent, args){
            return Project.findById(args.id)
           }
       },
       categories: {
           type: new GraphQLList(CategoryType),
           resolve(parent, args){
            return Category.find({})
           }
       },
       projects: {
           type: new GraphQLList(ProjectType),
           resolve(parent, args){
            return Project.find({})
           }
       }    
    }
});

// Mutation 
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let category = new Category({
                    name: args.name
                });
                return category.save();
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                task: { type: new GraphQLNonNull(GraphQLString) },
                completed: { type: new GraphQLNonNull(GraphQLBoolean) },
                categoryId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                let project = new Project({
                    name: args.name,
                    task: args.task,
                    completed: args.completed,
                    categoryId: args.categoryId
                });
                return project.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
