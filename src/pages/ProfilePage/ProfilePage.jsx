import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'
import userService from '../../utils/userService';


import rsvpService from '../../utils/rsvpService';

import Calendar from '../../components/Calendar/Calendar';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from '../../components/PostFeed/PostFeed';
import RsvpEvents from '../../components/RsvpEvents/RsvpEvents';
import PageHeader from '../../components/Header/Header';
import * as rsvpApi from '../../utils/rsvpService';
import { useLocation } from 'react-router-dom';

export default function ProfilePage({ user, handleLogout }) {

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



    

    useEffect(() => {
        getProfile()
    }, [])



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
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                        <h4>My created events:</h4><hr/>
                            <PostFeed isProfile={true} posts={posts} numPhotosCol={3} user={user} addRsvp={addRsvp} removeRsvp={removeRsvp} />
                        </Grid.Column>

            

                        {/* add cal to this row ?? */}
                    </Grid.Row>

            



                    {/* { likedIndexNumber > -1 ? <p>working</p> : <p>working but false</p>

                    } */}


        
                    {/* work on this */}
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                        <h4>My RSVP events:</h4><hr/>
                        <RsvpEvents 
                            isProfile={true} 
                            rsvpEvents={rsvpEvents}
                            posts={posts}
                            numPhotosCol={3} 
                            user={user} 
                            addRsvp={addRsvp} 
                            removeRsvp={removeRsvp} 
                            
                        />
      

                        {/* {user.id = posts.rsvp   ? 
                            <h1>Hello</h1>

                            : <h1>Hey now</h1>
                        } */}


                        
                            {/* <PostFeed  rsvps={rsvps} numPhotosCol={3} user={user} addRsvp={addRsvp} removeRsvp={removeRsvp} /> */}
                    

                        </Grid.Column>
        
                    </Grid.Row>

                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                                <Calendar />
                        </Grid.Column>

                    </Grid.Row>


                </Grid>
            }
        </>
    )
}
