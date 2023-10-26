import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostsAction } from '../store/slices/postSlice';
import { useSelector } from 'react-redux';

import SearchPost from './SearchPost';
import './Posts.css';

const PostsList = () => {
  const dispatch = useDispatch();
  const { postsData, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // dispatch(fetchPostsAction()).then((res) => {
    //   console.log(res);
    // });
    dispatch(fetchPostsAction())
      .unwrap()
      .then((res) => {
        console.log(res);
      });

    // dispatch(fetchPostsById({id:5})) == {id:5} => payload ของ asyncThunk
  }, []);

  if (loading) return <h1>Loading ....</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <SearchPost />
      <div className='posts-list'>
        <h1>Total Posts : 0</h1>
        {postsData.map((post) => (
          <div className='post-details' key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsList;
