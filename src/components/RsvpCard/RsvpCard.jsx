import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function RsvpCard({posts, rsvpPost, isProfile, isRsvpEvent, addRsvp, removeRsvp, user }) { 


  const likedIndexNumber = rsvpPost.rsvp.findIndex(rsvp => rsvp.username === user.username);

  const clickHandler = likedIndexNumber > - 1 ? () => removeRsvp(rsvpPost.rsvp[likedIndexNumber]._id) : () => addRsvp(rsvpPost._id);
  const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
 

  return (


    <Card key={rsvpPost._id}>
      {/* fix this to add a header if the other user posted it */}
     {isProfile ? ''
        :  
          <Card.Content textAlign='left'>
              <Image
                  floated='left'
                  size='large'
                  avatar
                  src={rsvpPost.user.photoUrl ? rsvpPost.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
              />
              <Card.Header floated="right">{rsvpPost.user.username}</Card.Header>
          </Card.Content>
      }
      {/* {likedIndexNumber > -1 ?  */}
        {/* // add to profile page */}
        <>

        <Image src={`${rsvpPost.photoUrl}`} wrapped ui={false} />
        <Card.Content>
          <Card.Description>
            Event name: {rsvpPost.title}
          </Card.Description>
        </Card.Content>

        <Card.Content>
          <Card.Description>
            Type of Event: {rsvpPost.event_type}
          </Card.Description>
        </Card.Content>

        <Card.Content>
          <Card.Description>
            Event descrription: {rsvpPost.caption}
          </Card.Description>
        </Card.Content>

        <Card.Content>
          <Card.Description>
            Date(s): {rsvpPost.start_date} - {rsvpPost.end_date}
          </Card.Description>
        </Card.Content>
      

        <Card.Content extra textAlign={'right'}>
          <Icon name={'star'} size='large' onClick={clickHandler} color={likeColor} />
          {rsvpPost.rsvp.length} Rsvp's
            
        </Card.Content>
      </>

      {/* :  // nothing
        ''
      } */}
      </Card>
      




  );
 
}

