// import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/Header/Header';
import './AddEvent.css';
// import AddPost from '../../components/AddPost/AddPost'
// import PostFeed from '../../components/PostFeed/PostFeed'
// import EditPostForm from '../../components/EditPostForm/EditPostForm'
// import * as postsApi from '../../utils/post-api'
// import * as rsvpApi from '../../utils/rsvpService';

// import {  Grid } from 'semantic-ui-react'

// export default function AddEvent({user, handleLogout}){


//     return (
//         <AddPost />
//     )

// }




import React, { useState } from 'react';
import * as postsApi from '../../utils/post-api'

import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function AddEvent({user, handleLogout}){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    caption: '',
    event_type: '',
    start_date: '',
    end_date: ''
  })
  const [title, setTitle] = useState({
    title: ''
  })
  const history = useHistory();
  const [error, setError] = useState('');

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    setTitle({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    console.log('is handlesUbmit being called?')

    const formData = new FormData()
    formData.append('photo', selectedFile)

    for (let key in state){
        formData.append(key, state[key]);
    }
   
    console.log("FORM DATA HERE: ", formData)
    try {
      await postsApi.create(formData);
      console.log("FORM DATA NEW: ", formData)
      history.push('/');
    }
    catch(err){
      console.log(err.message)
    //   setError(err.message)
    }
  }


  return (
    <div className="AddEvent">

    
    <Grid textAlign='center' verticalAlign='middle' >

    

      <Grid.Column >
        <PageHeader user={user} handleLogout={handleLogout} />

        <Segment >
            <Form  autoComplete="off" onSubmit={handleSubmit} className="EventForm">
            <h2>New Event</h2>

              <Form.Input
                  className="form-control"
                  name="title"
                  value={title.title}
                  placeholder="Add event title"
                  onChange={handleChange}
                  required
              />  

              <Form.Input
                  className="form-control"
                  name="caption"
                  value={state.caption}
                  placeholder="Add event details"
                  onChange={handleChange}
                  required
              />   

              <Form.Input
                  className="form-control"
                  name="event_type"
                  value={state.event_type}
                  placeholder="Enter type of event"
                  onChange={handleChange}
                  required
              /> 

              <Form.Input
                  className="form-control"
                  name="start_date"
                  value={state.start_date}
                  placeholder="Enter start date, i.e. 02-06-2022"
                  onChange={handleChange}
                  required
              /> 

              <Form.Input
                  className="form-control"
                  name="end_date"
                  value={state.end_date}
                  placeholder="Enter end date, i.e. 02-07-2022"
                  onChange={handleChange}
                  required
              /> 

              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />   

            
              <Button
                type="submit"
                className="btn"
              >
                ADD EVENT
              </Button>
            </Form>
          </Segment>

          {error ? <ErrorMessage error={error} /> : null}

          
      </Grid.Column>
    </Grid>
    </div>
   
  ); 
}
