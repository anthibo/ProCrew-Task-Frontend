import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'


function MenuBar() {

    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'dashboard' : pathname.substring(1)
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name)
    console.log(activeItem)


    const menuBar = user ? (
        <div>
            <Menu pointing secondary size='massive' color='teal' >
                <Menu.Item
                    name='dashboard'
                    as={Link}
                    to='/'
                    onClick={handleItemClick}
                    active={activeItem === 'dashboard'}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='Add user'
                        as={Link}
                        to='/add'
                        onClick={handleItemClick}
                        active={activeItem === 'Add user'}
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
                        onClick={handleItemClick}
                        active={activeItem === 'login'}
                    />
                    <Menu.Item
                        name='register'
                        as={Link}
                        to='/register'
                        onClick={handleItemClick}
                        active={activeItem === 'register'}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )

    return menuBar
}
export default MenuBar







