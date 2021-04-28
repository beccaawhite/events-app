import React from 'react';
import { Card  } from 'semantic-ui-react'
import RsvpCard from '../RsvpCard/RsvpCard';


export default function RsvpEvents({posts, rsvpEvents, numPhotosCol, isRsvpEvent, isProfile, addRsvp, removeRsvp, user}){

    // posts.map((post) => {

    //     if(rsvp.username === user.username)
    // }

    // const arr = post.rsvp.findIndex((rsvp) => rsvp.username === user.username)


    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
                {/* map through the ids on posts and if they match logged in user */}

                {rsvpEvents.map((rsvpPost) => {
                return ( 
                    <>
                        <RsvpCard 
                            user={user}
                            
                            rsvpPost={rsvpPost}
                            rsvpEvents={rsvpEvents}
                            key={rsvpEvents._id} 
                            isProfile={isProfile} 
                            isRsvpEvent={isRsvpEvent}
                            addRsvp={addRsvp}  
                            removeRsvp={removeRsvp}
                        />
                        
                    </>
                    )
                })}
        </Card.Group>
  
    )
}