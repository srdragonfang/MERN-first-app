import './App.css';
import { useDispatch } from 'react-redux'

import * as actions from './redux/actions'

function App() {
    const dispatch = useDispatch()
    // ket qua tra ve la mot function
    // giup check tu phia UI

    dispatch(actions.getPosts.getPostsRequest())

	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
			</header>
		</div>
	);
}

export default App;
