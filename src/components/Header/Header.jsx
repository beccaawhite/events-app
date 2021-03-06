import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon, Dropdown } from 'semantic-ui-react';



export default function PageHeader({user, handleLogout}){
    return (
        <>

        <Segment clearing className="headers">
            <Header as='h3' floated='right'>
            <Dropdown text={`Welcome, ${user.username}`} >
                
                <Dropdown.Menu >
                    <Dropdown.Item>
                        <Link to="/"><Icon name="home"> Home</Icon></Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/add'><Icon name="add"> Add Event</Icon></Link> 
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='' onClick={handleLogout}><Icon name="log out">Logout</Icon></Link>
                    </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
            </Header>
            <Header as='h2' floated='left'>
                <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image></Link>          
            </Header>
          

        </Segment>
        </>
    )
}