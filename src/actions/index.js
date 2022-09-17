import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// Gets the posts, then gets unique user ids of the posts using lodash; unique ids then used in fetchUser action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};

// Individual action creator for fetching posts
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

// Individual action creator for fetching users by user id
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};