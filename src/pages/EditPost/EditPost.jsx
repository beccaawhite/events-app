import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/Header/Header';
import AddPost from '../../components/AddPost/AddPost'
import PostFeed from '../../components/PostFeed/PostFeed'
import * as postsApi from '../../utils/post-api'
import * as rsvpApi from '../../utils/rsvpService';
import {  Grid } from 'semantic-ui-react'


export default function EditPost({user, handleLogout}){
    // const [state, setState] = ({

    // })


    // function handleChange(e){
    //     setState({
    //       ...state,
    //       [e.target.name]: e.target.value
    //     })
    //     setTitle({
    //       ...state,
    //       [e.target.name]: e.target.value
    //     })
    //   }



    // function handleSubmit(e){
    //     e.preventDefault()
    //     console.log('is handlesUbmit being called?')

    //     // Why do we need to create FormData
    //     // what type of request are we making?
    //     const formData = new FormData()
    //     formData.append('photo', selectedFile)
    //     formData.append('caption', state.caption)
    //     // of title error, look here. was title.title
    //     formData.append('title', title.title)
    //     formData.append('event_type', state.event_type)
    //     formData.append('start_date', state.start_date)
    //     formData.append('end_date', state.end_date)    
    //     // Have to submit the form now! We need a function!
    //     post.handleAddPost(formData)

    // }


    return (
        <h3>Edit Post!</h3>
    )
}