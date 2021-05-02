import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddPuppyForm(props){
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

  function handleSubmit(e){
    e.preventDefault()
    console.log('is handlesUbmit being called?')

    // Why do we need to create FormData
    // what type of request are we making?
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('caption', state.caption)
    // of title error, look here. was title.title
    formData.append('title', title.title)
    formData.append('event_type', state.event_type)
    formData.append('start_date', state.start_date)
    formData.append('end_date', state.end_date)    
    // Have to submit the form now! We need a function!
    props.handleAddPost(formData)

    // after form is submitted, empty the state
    // setState({
    //   caption: '',
    //   event_type: '',
    //   start_date: '',
    //   end_date: ''
    // })
  
    // setTitle({
    //   title: ''
    // })


  }


  return (
    
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            

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
                  placeholder="Enter start date, i.e. 02-05-2022"
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
      </Grid.Column>
    </Grid>
   
  ); 
}