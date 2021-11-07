import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { deleteUser } from '../utils/API'


export default function DeleteButton(props) {
    const userId = props.userId

    function deleteUserConfirm() {

        deleteUser(userId).then(
            res => {
                setConfirmOpen(false)
                console.log(res)
                window.location.reload(true);
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        (
            <>
                <Button as='div' color='red' onClick={() => setConfirmOpen(true)} floated='right'>
                    <Icon name='trash' style={{ margin: 0 }} />
                </Button>
                <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deleteUserConfirm} />
            </>
        )
    )
}


