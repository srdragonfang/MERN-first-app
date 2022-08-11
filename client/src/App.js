import './App.css';
import { useDispatch } from 'react-redux';

import * as actions from './redux/actions';
import HomePage from './pages/HomePage';

function App() {
	const dispatch = useDispatch();
	// ket qua tra ve la mot function
	// giup check tu phia UI

	dispatch(actions.getPosts.getPostsRequest());

	return (
		<div className='App'>
			<HomePage />
		</div>
	);
}

export default App;
