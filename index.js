const {ApolloServer}=require('apollo-server')  ;
const gql =require('graphql-tag') ;
const mongose = require('mongoose');
const {MONGODB} =require("./config"); 


const Post = require("./models/Post");
const User = require("./models/User");


const typeDefs = gql`
type Post {
    id:ID!
    body:String!
    createdAt:String!
    username:String!
}
type Query {
    getPosts: [Post]
}
`

const resolvers = {
    Query: {
        async getPosts(){
                try{
                    const posts = await Post.find();
                    return posts;
                }catch(err){throw new Error(err)}
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongose.connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>{
        console.log("Mongo connected")
  return  server.listen({port:5000})
})
    .then(res=>console.log(`Server at port ${res.port}`))

    .catch(err=>console.log(err))