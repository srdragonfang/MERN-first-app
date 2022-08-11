export const postsState$ = (state) => state.posts.data;
// postsState$ để hiểu đây là một selector
// state chính là store trong redux
// khi gọi đến postState$ sẽ trả về một data trong store của posts