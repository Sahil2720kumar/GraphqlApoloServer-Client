import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import axios from "axios"
import {TODOS} from "@/json/todo"
import {USERS} from "@/json/user"

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    website: String!
    phone: String!
  }

  type Todo {
    id:ID!
    title:String!
    completed:Boolean!
    userId:ID!
    user:User!
  }
  
  type Query {
    getTodos:[Todo]!
    getUsers:[User]!
    getUserById(id:ID!):User!
  }
`;

const resolvers = {
  Query: {
    //getTodos:async()=> (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
   // getUsers:async()=> (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
   // getUserById:async(parent,{id})=> (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
   getTodos:()=>TODOS,
   getUsers:()=>USERS,
   getUserById:()=>async (parent, { id }) => USERS.find((e) => e.id === id),
  },
  Todo: {
    user:async(todo)=>{
      //const todoCreateByUser=(await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
      //console.log(todo.title+todo.id+": "+todoCreateByUser.name+"\n")
      //console.log(todoCreateByUser.name)
      return USERS.find((e) => e.id === todo.userId)
    }
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };