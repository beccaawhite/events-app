import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'
import userService from '../../utils/userService';
import './ProfilePage.css';
import rsvpService from '../../utils/rsvpService';
import Calendar from '../../components/Calendar/Calendar';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from '../../components/PostFeed/PostFeed';
import RsvpEvents from '../../components/RsvpEvents/RsvpEvents';
import PageHeader from '../../components/Header/Header';
import * as rsvpApi from '../../utils/rsvpService';
import { useLocation } from 'react-router-dom';
import UpdateProfilePhotoForm from '../../components/UpdateProfilePhotoForm/UpdateProfilePhotoForm';

export default function ProfilePage({ user, handleLogout, handleSignUpOrLogin }) {

    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [rsvpEvents, setRsvpEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location)


    // use this for rsvp
    async function addRsvp(postId){
        try {
          const data = await rsvpApi.create(postId)
          console.log(data, ' response from addLike')
          getProfile()
        } catch(err){
          console.log(err)
        }
      }

    async function removeRsvp(rsvpId){
        try{  
            const data = await rsvpApi.removeRsvp(rsvpId);
            console.log(data, ' response from removeRsvp')
            getProfile()
        } catch(err){
            console.log(err)
        }
    }


    async function getProfile() {
        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data, "DATA IS HEREEEEE")
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setRsvpEvents(() => [...data.rsvpEvents])
            setProfileUser(() => data.user)

        } catch (err) {
            console.log(err, "THIS IS A PROFILE ERROR HERE")
            setError(err)
        }
    }

    async function handleUpdateProfilePhoto (photo){
        const updatedUser = await userService.updateProfilePhoto(photo);
        handleSignUpOrLogin()
        console.log(updatedUser)
      }


    useEffect(() => {
        getProfile()
    }, [user])



    return (

        <>
            { loading ?
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
                
                        <Grid.Column style={{ maxWidth: 450}}>
                                <Loader size='large' active>Loading</Loader> 
                        </Grid.Column>        
                </Grid>
                :
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader user={user} handleLogout={handleLogout}/>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column>
                            <ProfileBio user={profileUser} />
                        </Grid.Column>
                    </Grid.Row>
                     

                    { user._id == profileUser._id ? 
                        <Grid.Row>
                            <Grid.Column>
                                <UpdateProfilePhotoForm 
                                handleUpdateProfilePhoto={handleUpdateProfilePhoto}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    :
                    '' 
                    }

                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                        <div className="headers center">My created events</div><hr/>
                            <PostFeed isProfile={true} posts={posts} numPhotosCol={3} user={user} addRsvp={addRsvp} removeRsvp={removeRsvp} />
                        </Grid.Column>

                    </Grid.Row>

                    
                    { rsvpEvents.length ? 
                    
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                        <div className="headers center">My RSVP events</div><hr/>
                            <RsvpEvents 
                                isProfile={true} 
                                rsvpEvents={rsvpEvents}
                                posts={posts}
                                numPhotosCol={3} 
                                user={user} 
                                addRsvp={addRsvp} 
                                removeRsvp={removeRsvp}    
                            />
                        </Grid.Column>
                    </Grid.Row>

                    : ''
                    }

                    {/* come back and add calendar functionality */}
                    {/* <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                                <Calendar />
                        </Grid.Column>
                    </Grid.Row> */}


                </Grid>
            }
        </>
    )
}
