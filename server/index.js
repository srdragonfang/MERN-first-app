import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import posts from './routers/posts.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/posts', posts);

mongoose
	.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('connected to DB database successfully');

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log('err', err);
	});
