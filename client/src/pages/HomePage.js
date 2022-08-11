import React from 'react';
import Container  from '@mui/material/Container';

import Header from '../components/Header'
import PostList from '../components/PostList'
const HomePage = () => {
	return (
		<div>
			<Container maxWidth='lg'>
                <Header />
                <PostList />
			</Container>
		</div>
	);
};

export default HomePage;
