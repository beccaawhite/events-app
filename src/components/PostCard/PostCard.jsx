import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function PostCard({post, deletePost, editpost, isProfile, isRsvpEvent, addRsvp, removeRsvp, user }) { 

  // as the logged in the user when I add a like I want the heart to turn red
  // find out if the logged in user has liked the card
  // if they have, add it to their profile

  // const loggedInUser = post.find(post => post.user._id === user._id)
  
  const likedIndexNumber = post.rsvp.findIndex(rsvp => rsvp.username === user.username);
  // if one of the rsvps in post.rsvp is has the same username as are logged in user
  // it will return the index of that particular object in the post.rsvp array
  // if not it will return -1

  const clickHandler = likedIndexNumber > - 1 ? () => removeRsvp(post.rsvp[likedIndexNumber]._id) : () => addRsvp(post._id);
  const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
  // as the logged in the user when I click on the heart and it is red I want 
  // to remove the like and turn heart grey

  // function handleRsvp(user, post){
  //   while (likedIndexNumber > -1){
  //     user.rsvpEvent.push(post)
  //   }

  // }
   
  const handleDeletePost = () => deletePost(post._id)

  

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
              <Link style={{color: 'brown'}} to={`/${post.user.username}`}>
                <Card.Header floated="right">{post.user.username}</Card.Header>
              </Link>
          </Card.Content>
      }





      

    


      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
      <Card.Header>
        {post.title}
      </Card.Header>
      </Card.Content>

      <Card.Content>
        <Card.Description>
          {post.event_type} event
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


      
      { post.user._id == user._id ? 
      <>
    
      <Card.Content extra textAlign={'center'} style={{backgroundColor: "grey"}}>
        <Icon name={'trash'} size='large' color={"black"} onClick={handleDeletePost}/>
      </Card.Content>

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
