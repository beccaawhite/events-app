import React from 'react';
import {  Image, Grid, Segment } from 'semantic-ui-react';


function ProfileBio({user}) { 
  return (
  <Grid textAlign='center' columns={1} maxWidth="100px">
    <Grid.Row>
      <Grid.Column className="profile">

        <div vertical className="headers">
            <div>{user.username}'s Profile</div>
        </div>

        <div className="italized">
           <span > 
             "{user.bio}"
           </span>
        </div>

        <Image src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />

      </Grid.Column>
      <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
       
    
        
          
      </Grid.Column>
    </Grid.Row>
  </Grid>

  );
}



export default ProfileBio;