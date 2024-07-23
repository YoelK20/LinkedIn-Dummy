const { ObjectId } = require("mongodb");
const { findAllPosts, findPostById, createPost, createComment } = require("../models/post");

const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        authorId: ID
        comments:[Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
    }

    type Comments {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String
        createdAt: String
        updatedAt: String
    }

    input CreatePostInput {
        content: String!
        tags: [String]
        imgUrl: String

    }

    input CreateComments {
        postId: ID
        content: String!
    }

    input CreateLikes {
        postId: ID
    }

    type Query {
        getPost: [Post]
        getPostById(id: ID): Post
    }

    type Mutation {
        addPost(input: CreatePostInput): Post
        addComment(input: CreateComments, content: String!): Post
        addLikes(input: CreateLikes, content: String!): Post
    }
`;

const resolvers = {
    Query: {
        getPost: async () => {
            const posts = await findAllPosts()
            return posts
        },

        getPostById: async (_parent, args) => {
            const { id } = args
            const post = await findPostById(id)

            return post
        }
    },

    Mutation: {
        addPost: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()
            console.log(userLogin.userId);
            const { content, tags, imgUrl } = args.input
            const postData = await createPost({
                content,
                tags,
                imgUrl,
                authorId: userLogin.userId,
                comments: [],
                likes: [],
                createdAt: new Date(),
                updatedAt: new Date()
            })

            return postData
        },
        addComment: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const {postId, content} = args.input

            return await createComment(postId, {
                content,
                username: userLogin.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        )

        }
    }
}

module.exports = {
    postTypeDefs: typeDefs,
    postResolvers: resolvers
}