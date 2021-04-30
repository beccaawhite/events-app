import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Header, Image,  Segment, Dropdown } from 'semantic-ui-react'


// getonepost={getOnePost}

// updateProfilePhotoForm from chrus

export default function EditPost({ user, posts, getonepost }){
    // const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        caption: posts.caption,
        // event_type: posts.event_type,
        // start_date: posts.start_date,
        // end_date: posts.end_date,
        title: posts.title
    })
    const [showForm, setShowForm] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData()
        formData.append('title', state.title)
        formData.append('caption', state.caption)
        setShowForm(false)
        // not props
        posts.handleEdit(formData)
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleEditClick() {
        setShowForm(true)
    }

    function handleCancelClick() {
        setShowForm(false)
    }

    // function handleFileInput(e){
    //     setSelectedFile(e.target.files[0])
    //   }

    return(
        // <Grid centered>
        //     <Grid.Column style={{maxWidth: 450}}>
        //         <Segment>
        //             <label>Update Post</label>
        //             <hr/>
        //             <Form onSubmit={handleSubmit}>

        //             <Form.Input
        //                 className="form-control"
        //                 name="caption"
        //                 value={state.title}
        //                 placeholder="Update Event Title"
        //                 onChange={handleChange}
        //                 required
        //             />   

        //             <Form.Input
        //                 className="form-control"
        //                 name="caption"
        //                 value={state.caption}
        //                 placeholder="Update Description"
        //                 onChange={handleChange}
        //                 required
        //             />   
                    
        //             <Button
        //                 type="submit"
        //                 className="btn"
        //             >
        //                 UPDATE
        //             </Button>

        //             </Form>
        //         </Segment>
        //     </Grid.Column>
        // </Grid>


        <>
            <Button onClick={handleEditClick} floated='right'>Edit Post</Button>
            <Form autoComplete="off" onSubmit={handleSubmit} style={{display: showForm}}>
                <Segment textAlign='center'>
                    <Form.Input     
                        name="title"
                        type="name"
                        placeholder="event name"
                        value={state.title}
                        onChange={handleChange}
                        required
                    />
                    {/* <Form.Input     
                        name="username"
                        type="username"
                        placeholder="username"
                        value={state.username}
                        onChange={handleChange}
                        required
                    />
                    <Form.TextArea     
                        name="bio"
                        type="bio"
                        placeholder="bio"
                        value={state.bio}
                        onChange={handleChange}
                        required
                    /> */}
                    <Button
                        type="submit"
                        className="btn"
                        size="mini"
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        className="btn"
                        size="mini"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </Segment>
            </Form>
        </>
    )


} 