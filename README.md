
---
title: MERN project - note
URL: [HoleTex](https://www.youtube.com/watch?v=khcjRUZCufs)
author: S.R Dragonfang

---

# client

npx create-react-app .
npm install redux react-redux redux-saga redux-actions axios moment

# server

create index.js
npm init -y -y
npm install express mongoose body-parser cors nodemon

express = framework của node, giúp tạo các routing
mongoose = giúp tạo ra các model cho database

<!-- middleware -->

body-parser =
cors =
nodemon = giúp không khởi động lại server khi có sự thay đổi trong file js

1. Để có thể dùng import express from 'express'; thì cần vào pakage.json
   "type": "module",

2. "scripts": {
   "start": "nodemon index.js"
   },

3. npm start

### 2. Cài đặt cho các express middleware: body-parse, cors

2.1 <!-- index.js -->

```javascript
import bodyParser from 'body-parser';
import cors from 'cors';
```

2.2 Để có thể sử dụng các express middleware thì:

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
// giới hạn dung lượng tối đa là 30mb mà phía client có thể submit lên server
app.use(cors());
```

! Middleware trong express có thể hiểu đơn giản là nếu:

```javascript
app.use('/', cors());
// http://localhost:5000/
// "/" = route
```

thì chỉ những request nào gọi đến url `http://localhost:5000/` thì mới apply function cors()

Trong trường hợp `app.use(cors());` => không có route nào ở phía trước thì mọi request đều sẽ được chạy qua các middleware là body-parse và corse.

2.3

```javascript
app.get('/', (req, res) => {
	res.send('SUCCESS');
});
```

Khi chúng ta truy cập phía dưới client bằng đường dẫn: `http://localhost:5000` thì lúc này server sẽ trả về cho chúng ta một đoạn text = success.

Sử dụng middleware để phân chia cấu trúc route thành nhiều file khác nhau

### 3 create router/posts.js

<!-- posts.js -->

```javascript
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('ROUTER SUCCESS');
	// ở đây trả về một đoạn text cơ bản.
	// khi làm việc thực tế thì sẽ viết rất nhiều logic ở đây.
});

export default router;
```

<!-- index.js -->

```javascript
import posts from './router/posts.js';
app.use('/posts', posts);
```

### 4 create controllers/posts.js

```javascript
export const getPosts = (req, res) => {
	res.send('ROUTER SUCCESS');
};
```

<!-- router/posts.js -->

```javascript
import { getPosts } from '../controllers/posts.js';
router.get('/', getPosts);
```

<!-- router.get('/', (req, res) => {
    res.send('ROUTER SUCCESS')
    // ở đây trả về một đoạn text cơ bản.
    // khi làm việc thực tế thì sẽ viết rất nhiều logic ở đây.
}) -->

### 5 mongoose

```javascript
import mongoose from 'mongoose';
const URI = 'mongodb+srv://...';

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
```

# 6 model

create models/PostModel.js

1.  Giúp lưu trữ các bài viết của người dùng.

```javascript
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
			default: 'Anonymous',
		},
		attachment: String,
		likeCount: {
			type: Number,
			default: 0,
		},
		// nếu set timestamps: true thì sẽ từ động tạo 2 fields là createdAt UpdatedAt
	},
	{ timestamps: true }
);

export const PostModel = mongoose.model('Post', schema);
```

Tạo PostModel thành công.
Tiếp theo: - viết các route để có thể lấy được tất cả bài post, update, delete

<!-- server/controllers/posts.js -->

```javascript
export const createPosts = (req, res) => {
	res.send('ROUTER SUCCESS');
};
```

<!-- server/routers/posts.js -->

```javascript
import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost);

router.post('/', updatePost);

export default router;
```

<!-- [](server/controllers/posts.js) -->

```javascript
import { PostModel } from '../models/PostModel.js';

export const getPosts = async (req, res) => {
	try {
		// test getPosts
		// const post = new PostModel({
		// 	title: 'test',
		// 	content: 'this is a test',
		// });

		// post.save();

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
		const updatePost = await req.findOneAndUpdate(
			{ _id: updatePost._id },
			updatePost,
			{ new: true }
		);

		const post = new PostModel(updatePost);
		await post.save();
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
```

=> Vậy là đã viết xong API cho việc đọc và ghi dữ liệu.

# 7 Cấu hình redux-saga
7.1 src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from './redux-saga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```
    root
        |
        client/src
            |
            api/index.js
            |
            redux
                |
                actions
                |     |
                |     index.js
                |
                reduce
                |    |
                |    index.js
                |    |
                |    posts.js
                |
                sagas
                    |
                    index.js
                
        |
        |
        |
        |
        server

7.2 src/sagas/index.js

```javascript
function* mySaga() {}
export default mySaga;
```
generator function es6 là một function có thể được thực thi nhiều lần liên tiếp mà ngữ cảnh (số lượng biến, giá trị biến, trạng thái các thành phần bên trong hàm ...) đều có thể lưu lại sử dụng sau mỗi phiên. Với chức năng mới này, Generator function cũng có thể dừng thực thi bất cứ thời điểm nào, đợi một điều kiện nào nó xảy ra rồi mới tiếp tục thực thi (Ví dụ như khi gọi ajax, các kiến trúc async chẳng hạn).

syntax: 
    function* name([param[, param[, ... param]]]) {
    statements
    }
    * param: tham số đầu vào.
Tóm lại:
    - 1 funciton có thể được thực thi nhiều lần liên tiếp
    - ngữ cảnh có thể lưu lại sử dụng sau mỗi phiên
    - có thể dừng thực thi ở bất kì thời điểm nào
    - cần điều kiện mới có thể tiếp tục thực thi


[readmore-mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*?retiredLocale=vi)
[readmore](https://viblo.asia/p/generator-function-va-yield-trong-javascript-XL6lANXp5ek)

7.3 redux/reducers/index.js
```javascript
import { combineReducers } from "redux";
import posts from './posts'
export default combineReducers({
    posts,
})
```

7.4 redux/reducers/posts.js
```javascript
export default function postReducers() {}
```

7.5 src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from './redux-saga';
// add
import reducers from './redux/reducers'
import mySaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // change
  <Provider store={store}>
    <App />
  </Provider>
);
```

7.6 redux/actions/index.js

```javascript
// Một library giúp tạo ra các actions
import {createActions}   from 'redux-actions';

// Đối với một action thực hiện site effect như call api thì có 3 actions cho hành động đó.
// 1. Gửi request
// 2. Khi success
// 3. Khi failure


// action: getPosts = lấy hết tất cả dữ liệu từ database
// co the tao nhieu action mot luc bang method createActions()
export const getPosts = createActions({
    // 1. Khi gui mot request thi goi action
    getPostsRequest: undefined,
    // undefined khi khong co mot payload nao cho truong hop request
    // Khi goi action thanh cong
    getPostsSuccess: (payload) => payload,
    // Khi goi action that bai
    getPostsFailure: (err) => err,
})
```
Sau khi tạo action thành công thì cần viết một saga và một reducer để xử lí action

7.7 redux/api/index.js
```javascript
import axios from 'axios'

const URL = 'http://localhost:5000'

export const fetchPosts = () => axios.get(`${URL}/posts`)
```

7.8 client/src/redux/sagas/index.js

```javascript
import { takeLatest, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api'
function* fetchPostSaga(action) {
    // yeild cú pháp khi xử lí generator function
    // về cơ bản thì giống như async await
    const posts = yield call(api.fetchPosts)
    console.log('sagas/fetchPostSaga')
    console.log('[posts]', posts);
    // call = khi muốn thực thi một function thì gọi call
    // trường hợp call tới một promise thì function này sẽ đợi cho tới khi function này được restone, khi có kết quả trả về thì yeild mới hoàn thành xong.

}

function* mySaga() {
	yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
    console.log('sagas/mysaga')
    // takeLatest: giả dụ ở phía UI có nhiều action một lúc thì chỉ có action cuối cùng là được xử lí dữ liệu
    // tất cả các saga xử lí cho tất cả các action trước đó mà chưa kết thúc thì nó sẽ bị cancel hết 
}
export default mySaga;
```

7.9 reducers/posts.js
Khi nao function reducer cung co hai tham so (state, action )
Bao giờ cũng cần một giá trị khởi tạo cho state
 
 7.9.1 create src/contant.js
 
 ```javascript
export const INIT_STATE = {
    posts: {
        isLoading: false,
        data: [],
    }
}
 ```




<u>Cách hoạt động của Redux.</u>

        Action------------------------dispatch action-------|
        |up arrow                                           |
        event                           |-------------      redux-saga middleware <=== req & res ===> APIs
        |up arrow                       |                   |
        view layer  <---update state--- store               effect(s)
                                        |                   |
                                        |                   |
                                        |-------------      Reducers

View layer = component App
redux-saga là một middleware nằm giữa ACTION và REDUCERS
    - trong redux-saga có rất nhiều effect
    - Trước khi action được đưa tới reducer thì nó thực hiện các site effect:
        ex: 
            - call api
    - Sau khi có dữ liệu trả về từ API nó mới tiếp tục đưa dữ liệu
Khi có một active được dispatch thì sẽ được đưa vào redux-saga để gọi một biến API.#   M E R N - f i r s t - a p p  
 