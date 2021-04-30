import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon, Dropdown } from 'semantic-ui-react';


const options = [
    {
        key: 'add event',
        text: 'Add Event',
        icon: 'add',
        as: Link, to: '/add'
        // image: {}
    },
    {
        key: 'my profile',
        text: 'My profile'
        // image: {}
    },
    {
        key: 'logout',
        text: 'Logout'
        // image: {}
    }
]

export default function PageHeader({user, handleLogout}){
    return (
        <>

        <Segment clearing>
            <Header as='h2' floated='right'>
            <Dropdown text={`welcome, ${user.username}`} >
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