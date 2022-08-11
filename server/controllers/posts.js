import { PostModel } from '../models/PostModel.js';

export const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find();
		// mặc định khi gọi find() sẽ return tất cả các bài post
		console.log('posts', posts);
		res.status(200).json(posts);
		// response về cho client một status thành công (200)
		// .json(posts) là dữ liệu tất cả các bài viết
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

export const createPost = async (req, res) => {
	try {
		const newPost = req.body;

		const post = new PostModel(newPost);
		await post.save();
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

export const updatePost = async (req, res) => {
	try {
		// vẫn trả về dữ liệu cũ - khi chưa cập nhật
        // const updatePost = await req.findOneAndUpdate({_id: updatePost._id}, updatePost); 
		// trả về dữ liệu mới
        const updatePost = await req.findOneAndUpdate({_id: updatePost._id}, updatePost, {new: true}); 


		const post = new PostModel(updatePost);
		await post.save();
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
