import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { getUsers, forgotPassword } from '../utils/API'

export default function ForgotPassowrd(props) {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const { onChange, onSubmit, values } = useForm(formSubmit, {
        email: '',
        newPassword: '',
        confirmNewPassword: '',
        reset_password: ''
    })
    function formSubmit() {
        setErrors({})
        setLoading(true)
        if (!user) {
            if (values.email === '') {
                setErrors({ email: 'Please enter your email' })
                setLoading(false)

            }
            getUsers(`email=${values.email}`).then(
                res => {
                    const userData = (res.data.users)[0]
                    if (!userData) {
                        setErrors({ email: 'This email does not exist' })
                        setLoading(false)

                    }
                    setUser(userData)
                    console.log(userData)
                    setLoading(false)


                }
            ).catch(err => {
                console.log(err.response)
                setLoading(false)


            })
        }
        else {
            forgotPassword(values).then(res => {
                console.log(res)
                props.history.push('/')
                setLoading(false)

            }).catch(err => {
                setErrors({ message: err.response.data.error })
                setLoading(false)

            })
        }
    }
    const [errors, setErrors] = useState({})
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} loading={loading} >
                <h1>Insert your email</h1>
                <Form.Input
                    label='Email'
                    placeholder='Email..'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}
                />
                {user && (
                    <>
                        <Form.Input
                            label='Security question'
                            name='reset_question'
                            type='text'
                            value={user.reset_question}

                        />
                        <Form.Input
                            label='Your answer'
                            name='reset_answer'
                            type='text'
                            value={values.reset_answer}
                            onChange={onChange}
                            error={errors.reset_answer ? true : false}
                        />
                        <Form.Input
                            label='New password'
                            name='newPassword'
                            type='password'
                            value={values.newPassword}
                            onChange={onChange}
                            error={errors.newPassword ? true : false}
                        />
                        <Form.Input
                            label='Confirm password'
                            name='confirmNewPassword'
                            type='password'
                            value={values.confirmNewPassword}
                            onChange={onChange}
                            error={errors.confirmNewPassword ? true : false}
                        />

                    </>
                )}
                <Button type='submit' primary>Update My Password</Button>

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
