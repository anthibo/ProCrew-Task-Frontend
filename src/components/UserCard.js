import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Label, Image, Button, Grid } from 'semantic-ui-react'

import DeleteButton from './DeleteButton'
//TODO:fix date format
//TODO: beautify icons

export default function UserCard({ user: { id, name, email, address, phone_number, created_at } }) {
    return (
        <Card fluid style={{ marginBottom: 10 }}>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in {Date(created_at)}</span>
                </Card.Meta>
                <Card.Description>
                    <p>{email}</p>
                    <p>{address}</p>
                    <p>{phone_number}</p>

                </Card.Description>
            </Card.Content>
            <Card.Content extra >

                <Grid centered >

                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Button labelPosition='right' as={Link} to={`/edit/${id}`}>
                                <Button color='blue' basic>
                                    <Icon name='edit' />
                                </Button>
                            </Button>
                        </Grid.Column>

                        <Grid.Column>
                            <DeleteButton userId={id} />
                        </Grid.Column>

                    </Grid.Row>

                </Grid>

            </Card.Content>
        </Card>
    )

}
