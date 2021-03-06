import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
export default function UpdateProfilePhotoForm(props){

  const [selectedFile, setSelectedFile] = useState('')

  const [state, setState] = useState({
    photo: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log('is handlesUbmit being called?')
    // Why do we need to create FormData
    // what type of request are we making?
    const formData = new FormData()
    formData.append('photo', selectedFile)
    // Have to submit the form now! We need a function!
    props.handleUpdateProfilePhoto(formData);
  }

  return (
    <Grid textAlign='left' verticalAlign='middle' centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 200 }}>
        <Segment clearing style={{backgroundColor: "#4056A1"}}>
            <Form  autoComplete="off" onSubmit={handleSubmit} >
              <Form.Input
                  type='file'
                  name='photo'
                  placeholder='Upload Photo'
                  onChange={handleFileInput}
              /> 
              <Button
                color="#EFE2BA"
                inverted
                type="submit"
                className="btn updatePicture"
                >
                Update Picture!
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid.Row>
    </Grid>
  ); 
}