import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/Header/Header';
import AddPost from '../../components/AddPost/AddPost'
import PostFeed from '../../components/PostFeed/PostFeed'
import EditPostForm from '../../components/EditPostForm/EditPostForm'
import * as postsApi from '../../utils/post-api'
import * as rsvpApi from '../../utils/rsvpService';
import './Feed.css';

import {  Grid } from 'semantic-ui-react'

export default function Feed({user, handleLogout}){

    const [posts, setPosts] = useState([]);

    // Whereever your state is you'll probably 
    // have an api function defined in the same component that will end updating the state


    // USE for RSVP
    async function addRsvp(postId){
      try {
        const data = await rsvpApi.create(postId)
        console.log(data, ' response from addLike')
        getPosts() // get the updated posts
      } catch(err){
        console.log(err)
      }
    }

    async function removeRsvp(rsvpId){
      try{  
        const data = await rsvpApi.removeRsvp(rsvpId);
        console.log(data, ' response from removeLike')
        getPosts()
      } catch(err){
        console.log(err)
      }
    }

    async function deletePost(postId){
      try{  
        const data = await postsApi.deletePost(postId);
        console.log(data, ' response from deletePost')
        getPosts()
      } catch(err){
        console.log(err)
      }
    }


    // get all posts
    async function getPosts(){
    
        try {
          const data = await postsApi.getAll();
          setPosts([...data.posts])
        } catch(err){
          console.log(err, ' this is the error')
        }
      }

      useEffect(() => {
        getPosts()
      
      }, [])

      // async function editPost(state){
      //   console.log(" !!!! edit post in feed")
      //     try {
      //         await postService.editPost(state);
      //         handleLogout()
      //     } catch(err){
      //         setError(err)
      //     }
      // }

      async function getOnePost(){
        console.log(" get the post!!! ")
      }



    return (
      <Grid centered >

        <Grid.Row>
          <Grid.Column>
            <PageHeader user={user} handleLogout={handleLogout}/>
          </Grid.Column>
        </Grid.Row>

    
        {/* <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}> */}
            {/* <EditPostForm 
              user={user}
              posts={posts}  
              numPhotosCol={1} 
              isProfile={false} 
              isRsvpEvent={false}
              deletePost={deletePost}
              editpost={editPost}
              getonepost={getOnePost}
              addRsvp={addRsvp} 
              removeRsvp={removeRsvp} 
            
            /> */}
          {/* </Grid.Column>
        </Grid.Row> */}
       
        <Grid.Row>
          <Grid.Column style={{maxWidth: 450}}>
            <PostFeed 
              user={user}
              posts={posts}  
              numPhotosCol={1} 
              isProfile={false} 
              isRsvpEvent={false}
              deletePost={deletePost}
              addRsvp={addRsvp} 
              removeRsvp={removeRsvp}
              // editpost={editPost}
              />
          </Grid.Column>
        </Grid.Row>

    </Grid>
    )
}