import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validator/validator';
import { createField, Element } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);
const TextArea = Element("textarea");

function MyPostForm(props) {
    return (
        <div>
            <span>New post</span>
            <form onSubmit={props.handleSubmit}>
                {createField("Enter your post", "textBody", TextArea, [required, maxLength10])}
                <div><button>Add post</button></div>
            </form>
        </div>
    )
}

const MyPostReduxForm = reduxForm({ form: 'myPost' })(MyPostForm);

function MyPosts(props) {
    
    let postsElements = props.posts.map( post => <Post message={post.message} likesCount={post.likesCount} id={post.id} key={post.id} />);

    let addPost = (body) => {
        props.addPostActionCreator(body);
    }

    let onSubmit = (formData) => {
        addPost(formData.textBody);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <MyPostReduxForm onSubmit={onSubmit} />
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    );
}

export default MyPosts;