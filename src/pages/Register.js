import React, { useState, useContext, useRef } from 'react'
import { Button, Container, Form, Message } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'

import { useForm } from '../utils/hooks'
import { createUser } from '../utils/API'
import { AuthContext } from '../context/auth'



function Register(props) {


    const { user } = useContext(AuthContext)
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const { onChange, onSubmit, values } = useForm(registerUser, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: '',
        address: '',
        reset_answer: ''
    })
    const [userData, setUserData] = useState({ email: '', name: '' })
    const [reset_question, setReset_question] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const successRef = useRef(null);



    console.log(reset_question)

    const questionsOptions = [
        { key: 0, value: 'In what city were you born?', text: 'In what city were you born?' },
        { key: 1, value: 'What is the name of your favorite pet', text: 'What is the name of your favorite pet' },
        { key: 2, value: 'What is your favorite food', text: 'What is your favorite food' },
        { key: 3, value: 'What is the name of your first school?', text: 'What is the name of your first school?' },
        { key: 4, value: 'What is your favorite club', text: 'What is your favorite club' }
    ]
    function registerUser() {
        setLoading(true)
        setErrors({})
        values.reset_question = reset_question
        values.name = userData.name
        values.email = userData.email
        createUser(values).then(res => {
            setLoading(false)
            setSuccess(true)
            props.history.push('/')
        }).catch(err => {
            setLoading(false)
            setSuccess(false)
            console.log(err)
            if (err.response) {
                console.log(err.response)
                if ((err.response.data.error.err.messages) !== undefined) {
                    let errorsData = {}
                    const resErrors = err.response.data.error.err.messages.errors
                    resErrors.forEach(element => {
                        errorsData[element.field] = `${element.field} ${element.message}`
                    });
                    setErrors(errorsData)
                }


            } else {
                console.log(err)
            }
        })
    }

    const googleAuthOnSuccess = (res) => {
        const { name, email } = (res.profileObj)
        setUserData({ name, email })
    }
    const handleNameEmailChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value }
        )
    }

    return (
        <div className='form-container'>
            {success && (
                <Message positive style={{ marginTop: 10 }} ref={successRef}>
                    <Message.Header>User registered successfully 🎉🎉🎉</Message.Header>
                </Message>
            )}

            <Form onSubmit={onSubmit} loading={loading}>
                {user ? (<h1>Add User</h1>) : (<h1>Register</h1>)}

                <Form.Input
                    label='Email'
                    placeholder='Email'
                    name='email'
                    type='email'
                    value={userData.email}
                    onChange={handleNameEmailChange}
                    error={errors.email ? true : false}


                />
                <Form.Input
                    label='Name'
                    placeholder='Name'
                    name='name'
                    type='text'
                    value={userData.name}
                    onChange={handleNameEmailChange}
                    error={errors.name ? true : false}

                />

                <Form.Input
                    label='Password'
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}
                />
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false}
                />

                <Form.Input
                    label='Phone Number'
                    placeholder='Phone Number'
                    name='phone_number'
                    type='text'
                    value={values.phone_number}
                    onChange={onChange}
                    error={errors.phone_number ? true : false}
                />
                <Form.Input
                    label='address'
                    placeholder='address'
                    name='address'
                    type='text'
                    value={values.address}
                    onChange={onChange}
                    error={errors.address ? true : false}
                />
                <Form.Select
                    placeholder='Select a security question'
                    label='Security Question'
                    options={questionsOptions}
                    name='reset_question'
                    onChange={(e, { value }) => setReset_question(value)}
                    error={errors.reset_question ? true : false}

                />
                <Form.Input
                    label='Answer'
                    placeholder='answer'
                    name='reset_answer'
                    type='text'
                    value={values.reset_answer}
                    onChange={onChange}
                    error={errors.reset_answer ? true : false}
                />
                <Container>
                    <Button type='submit' primary style={{ marginRight: 10 }}>Sign up</Button>
                    {!user && (<GoogleLogin
                        clientId={clientId}
                        buttonText='Sign up with google'
                        onSuccess={googleAuthOnSuccess}
                        onFailure={(err) => {
                            console.log(err)
                        }}

                        cookiePolicy='single_host_origin'
                    />)}

                </Container>


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

export default Register