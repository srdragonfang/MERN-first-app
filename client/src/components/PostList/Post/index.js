import React from 'react';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
// convert updateAt
import moment from 'moment'

const Post = ({post}) => {
	return (
		<Card>
			<CardHeader
				avatar={<Avatar>A</Avatar>}
				title={post.author}
				subheader={moment(post.updateAt).format('HH:MM MMM DD, YYYY')}
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
			/>
			<CardMedia image='https://cdn.pixabay.com/photo/2012/04/14/14/32/skull-34133_960_720.png' title='This Is Title' />
			<CardContent>
				<Typography variant='h5' color='textPrimary'>
					{post.title}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					{post.content}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton>
					<FavoriteIcon />
					<Typography component='span' color='textSecondary'>
						{post.likeCount} Likes
					</Typography>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Post;
