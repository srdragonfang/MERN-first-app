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
