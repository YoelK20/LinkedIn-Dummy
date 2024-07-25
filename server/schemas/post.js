const { ObjectId } = require("mongodb");
const { findAllPosts, findPostById, createPost, createComment, createLikes } = require("../models/post");
const redis = require("../config/redis")
const Posts_data = "data:posts"

const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        authorId: ID
        author: User
        comments:[Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
    }

    type Comment {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Like {
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
        addComment(input: CreateComments): Post
        addLikes(input: CreateLikes): Post
    }
`;

const resolvers = {
    Query: {
        getPost: async () => {

            const postCache = await redis.get(Posts_data)
            // console.log(postCache);
            if(postCache) {
                return JSON.parse(postCache)
            }

            const posts = await findAllPosts()

            await redis.set(Posts_data, JSON.stringify(posts))

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
            // console.log(userLogin.userId);
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

            redis.del(Posts_data)

            return postData
        },
        addComment: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const { postId, content } = args.input

            const comments = await createComment(postId, {
                content,
                username: userLogin.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            )

            redis.del(Posts_data)

            return comments

        },
        addLikes: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()
            const { postId } = args.input
            const likes = await createLikes(postId, {
                username: userLogin.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            )

            redis.del(Posts_data)
            return likes
        }
    }
}

module.exports = {
    postTypeDefs: typeDefs,
    postResolvers: resolvers
}