import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, onPostChangeActionCreator } from '../../../redux/profile-reducer';

function MyPosts(props) {
    
    let postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount} id={post.id} />);

    let addPost = () => {
        props.dispatch( addPostActionCreator() );
    }

    let onPostChange = (e) => {
        let text = e.target.value;
        props.dispatch( onPostChangeActionCreator(text) );
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <span>New post</span>
                <div><textarea onChange={ onPostChange } value={props.newPostText} /></div>
                <div><button onClick={ addPost }>Add post</button></div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    );
}

export default MyPosts;