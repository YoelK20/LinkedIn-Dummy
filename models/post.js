const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnection")

const PostsTable = () => {
    return getDatabase().collection("Posts")
}

const findAllPosts = async () => {
    const posts = await PostsTable().find().toArray()
    return posts
}

const findPostById = async (id) => {
    const post = await PostsTable().findOne({
        _id: new ObjectId(id)
    })
    return post
}

const createPost = async (data) => {
    const newPost = await PostsTable().insertOne(data)
    const dataPost = await PostsTable().findOne({
        _id: new ObjectId(newPost.insertedId)
    })

    return dataPost
}

const createComment = async (id, data) => {
    const updatePostComment = await PostsTable().updateOne(
        {_id: new ObjectId(id)},
        {$push: {comments: data}}
    )
    
    const postData = await PostsTable().findOne({
        _id: new ObjectId(id)
    })

    return postData
}

const createLikes = async (id, data) => {
    const updatePost = await PostsTable().updateOne(
        {_id: new ObjectId(id)},
        {$push: {likes: data}}
    )
    
    const postData = await PostsTable().findOne({
        _id: new ObjectId(id)
    })

    return postData
}

module.exports = { findAllPosts, findPostById, createPost, createComment, createLikes }