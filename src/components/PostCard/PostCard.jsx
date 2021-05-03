import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function PostCard({post, deletePost, editpost, isProfile, isRsvpEvent, addRsvp, removeRsvp, user }) { 

  
  const likedIndexNumber = post.rsvp.findIndex(rsvp => rsvp.username === user.username);

  const clickHandler = likedIndexNumber > - 1 ? () => removeRsvp(post.rsvp[likedIndexNumber]._id) : () => addRsvp(post._id);
  const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
   
  const handleDeletePost = () => deletePost(post._id)

  const start = post.start_date.slice(0, 10)
  const end = post.end_date.slice(0, 10)

  return (
  

    <Card key={post._id} className="PostCard">
     {isProfile ? ''
        :  
          <Card.Content textAlign='left'>
              <Image
                  floated='left'
                  size='large'
                  avatar
                  src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
              />
              <Link style={{color: '#4056A1'}} to={`/${post.user.username}`}>
                <Card.Header floated="right">{post.user.username}</Card.Header>
              </Link>
          </Card.Content>
      }




      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description className="headers">
          {post.title} <hr/>
        </Card.Description>

        <Card.Description className="italized">
          {post.event_type} event
        </Card.Description>
        
        <Card.Description>
          Details: {post.caption}
        </Card.Description>

        <Card.Description>
          Date(s): {start} - {end}
        </Card.Description>

        <Card.Content extra textAlign={'right'}>
          <Icon name={'star'} size='large' onClick={clickHandler} color={likeColor} />
          {post.rsvp.length} Rsvp's
        </Card.Content>

      </Card.Content>


      
      { post.user._id == user._id ? 
      <>
    
      <Card.Content extra textAlign={'center'} style={{backgroundColor: "#D79922"}}>
        <Icon name={'trash'} size='large' color={"black"} onClick={handleDeletePost}/>
      </Card.Content>

      {/* edit form temporarily removed until able to fully implement  */}
      {/* <Card.Content extra textAlign={'center'} style={{backgroundColor: "pink"}}> */}
        {/* <Link to={`/edit/${post._id}`}><Icon name={'edit'} editpost={editpost} size='large' color={"grey"} />
        </Link> */}
        {/* <Icon name={'edit'} editpost={editpost} size='large' color={"grey"} /> */}
      {/* </Card.Content> */}
      </>
      : ''
    }

    </Card>
  


  );
}
