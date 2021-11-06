import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { getUser, editUser } from '../utils/API'
import { useForm } from '../utils/hooks'

export default function EditUser(props) {
    const id = props.match.params.id
    const [userInfo, setUserInfo] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        getUser(id).then(res => {
            const userData = res.data.user
            setUserInfo(userData)
        }).catch(err => {
            console.log(err)
        },
        )
    }, [id])
    console.log(userInfo)
    const { onSubmit } = useForm(editUserCallback, userInfo)
    const onChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
    }



    function editUserCallback() {
        editUser(id, userInfo).then(
            res => {
                console.log(res)
                props.history.push('/')
            }
        ).catch(
            err => {
                if (err.response) {
                    console.log(err.response)
                    if ((err.response.data.error.messages) !== undefined) {
                        let errorsData = {}
                        const resErrors = err.response.data.error.messages.errors
                        resErrors.forEach(element => {
                            errorsData[element.field] = `${element.field} ${element.message}`
                        });
                        setErrors(errorsData)
                    }
                    else {
                        setErrors({ message: 'This email is already taken' })
                    }
                }
                else {
                    setErrors({ message: 'Something went wrong. Please try again later' })
                    console.log(err)
                }
            }
        )
    }
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit}>
                <h1>Edit {userInfo.name}'s Information</h1>
                <Form.Input
                    label='Email'
                    placeholder='Email'
                    name='email'
                    type='email'
                    value={userInfo.email}
                    onChange={onChange}
                    error={errors.email ? true : false}

                />

                <Form.Input
                    label='Address'
                    placeholder='Address'
                    name='address'
                    type='text'
                    value={userInfo.address}
                    onChange={onChange}
                    error={errors.address ? true : false}

                />

                <Form.Input
                    label='Phone'
                    placeholder='Phone'
                    name='phone_number'
                    type='text'
                    value={userInfo.phone_number}
                    onChange={onChange}
                    error={errors.phone_number ? true : false}

                />
                <Button type='submit' primary>Update</Button>
            </Form>


            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}
