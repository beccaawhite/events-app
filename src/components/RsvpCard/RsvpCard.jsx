import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function RsvpCard({posts, rsvpPost, isProfile, isRsvpEvent, addRsvp, removeRsvp, user }) { 


  const likedIndexNumber = rsvpPost.rsvp.findIndex(rsvp => rsvp.username === user.username);

  const clickHandler = likedIndexNumber > - 1 ? () => removeRsvp(rsvpPost.rsvp[likedIndexNumber]._id) : () => addRsvp(rsvpPost._id);
  const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
 
  const start = rsvpPost.start_date.slice(0, 10)
  const end = rsvpPost.end_date.slice(0, 10)

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

          <Card.Description className="headers">
            {rsvpPost.title}
          </Card.Description>

          <hr/>

          <Card.Description className="italized">
            {rsvpPost.event_type} event
          </Card.Description>

          <Card.Description>
            Details: {rsvpPost.caption}
          </Card.Description>

          <Card.Description>
            Date(s): {start} - {end}
          </Card.Description>

          <Card.Content extra textAlign={'right'}>
          <Icon name={'star'} size='large' onClick={clickHandler} color={likeColor} />
          {rsvpPost.rsvp.length} Rsvp's
            
        </Card.Content>

        </Card.Content>

    


        

  
      </>

      {/* :  // nothing
        ''
      } */}
      </Card>
      




  );
 
}

