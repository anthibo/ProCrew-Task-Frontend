import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'


function MenuBar() {

    const { user, logout } = useContext(AuthContext)


    const menuBar = user ? (
        <div>
            <Menu pointing secondary size='massive' color='teal' >
                <Menu.Item
                    name='dashboard'
                    as={Link}
                    to='/'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='add user'
                        as={Link}
                        to='/add'
                    />
                    <Menu.Item
                        name='logout'
                        onClick={logout}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    ) : (
        <div>
            <Menu pointing secondary size='massive' color='teal' >
                <Menu.Item
                    name='Dashboard'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        as={Link}
                        to='/login'
                    />
                    <Menu.Item
                        name='register'
                        as={Link}
                        to='/register'
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )

    return menuBar
}
export default MenuBar







