import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function PostCard({post, isProfile, isRsvpEvent, addRsvp, removeRsvp, user }) { 

  // as the logged in the user when I add a like I want the heart to turn red
  // find out if the logged in user has liked the card
  // if they have, add it to their profile

  
  const likedIndexNumber = post.rsvp.findIndex(rsvp => rsvp.username === user.username);
  // if one of the rsvps in post.rsvp is has the same username as are logged in user
  // it will return the index of that particular object in the post.rsvp array
  // if not it will return -1

  const clickHandler = likedIndexNumber > - 1 ? () => removeRsvp(post.rsvp[likedIndexNumber]._id) : () => addRsvp(post._id);
  const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
  // as the logged in the user when I click on the heart and it is red I want 
  // to remove the like and turn heart grey

  function handleRsvp(user, post){
    while (likedIndexNumber > -1){
      user.rsvpEvent.push(post)
    }

  }

  return (

    <Card key={post._id}>
     {isProfile ? ''
        :  
          <Card.Content textAlign='left'>
              <Image
                  floated='left'
                  size='large'
                  avatar
                  src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
              />
              <Card.Header floated="right">{post.user.username}</Card.Header>
          </Card.Content>
      }

      

    


      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
      <Card.Description>
        Event name: {post.title}
      </Card.Description>
      </Card.Content>

      <Card.Content>
        <Card.Description>
          Type of Event: {post.event_type}
        </Card.Description>
      </Card.Content>

      <Card.Content>
        <Card.Description>
          Event descrription: {post.caption}
        </Card.Description>
      </Card.Content>

      <Card.Content>
        <Card.Description>
          Date(s): {post.start_date} - {post.end_date}
        </Card.Description>
      </Card.Content>
     

      <Card.Content extra textAlign={'right'}>
        <Icon name={'star'} size='large' onClick={clickHandler} color={likeColor} />
        {post.rsvp.length} Rsvp's
          
      </Card.Content>
    </Card>




  );
}
