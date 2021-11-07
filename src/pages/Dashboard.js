import React, { useState, useEffect } from 'react'
import { Dimmer, Grid, Loader, Transition } from 'semantic-ui-react'

import { getUsers } from '../utils/API'
import UserCard from '../components/UserCard'



function Dashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        retrieveUsers()
    }, [])

    const retrieveUsers = async () => {
        setLoading(true)
        getUsers('').then(
            res => {
                setLoading(false)
                console.log(res)
                const usersData = res.data.users
                setUsers(usersData)
            }
        ).catch(err => {
            setLoading(false)
            console.log(err.response)
        })
    }

    console.log(users)

    return (
        <div style={{ marginTop: 10 }}>
            {loading && (
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            )}

            <Grid stackable columns={3}>
                <Grid.Row >
                    <Transition.Group>
                        {users && users.map(user => (
                            <Grid.Column key={user.id}>
                                <UserCard user={user} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                </Grid.Row>

            </Grid>
        </div>
    )
}


export default Dashboard