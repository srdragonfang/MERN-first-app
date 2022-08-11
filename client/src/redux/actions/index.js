// Một library giúp tạo ra các actions
import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
	return reduxAction().type;
};
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
});

// một function trả về một obj
/*
{
    type: 'getPostsRequest',
}


getType(getPosts.getPostsSuccess) =>
 {
    type: 'getPostsSuccess',
    payload: {
        name: 'Test'
    }
 }

*/
