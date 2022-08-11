import { INIT_STATE } from '../../constant';
import { getPosts, getType } from '../actions';

export default function postReducers(state = INIT_STATE.posts, action) {
	switch (action.type) {
		// getPosts.getPostsRequest() la mot string nen can boc boi getType
		// case: getPostsRequest
		case getType(getPosts.getPostsRequest):
			console.log('reducers/getPosts.getPostsRequest');
			return {
				...state,
				isLoading: true,
			};
		// case: getPostsSuccess
		case getType(getPosts.getPostsSuccess):
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		// case: getPostsFailure
		case getType(getPosts.getPostsFailure):
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
}
