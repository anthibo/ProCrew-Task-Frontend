import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import { Button, Container, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { login, loginWithGoogle } from '../utils/API'
import { useForm } from '../utils/hooks'


function Login(props) {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const context = useContext(AuthContext)
    const { onChange, onSubmit, values } = useForm(loginCallback, {
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)


    function loginCallback() {
        setLoading(true)
        login(values).then(
            res => {
                setLoading(false)
                const userData = res.data
                context.login(userData)
                props.history.push('/')
            }
        ).catch(
            err => {
                setLoading(false)
                if (err.response) {
                    console.log(err.response)
                    setErrors({ message: 'wrong credientials' })
                }
                else {
                    setErrors({ message: 'Something went wrong.. Please try again later' })
                    console.log(err)
                }
            }
        )
    }

    if (context.user) {
        props.history.push('/')
    }

    const googleAuthOnSuccess = (res) => {
        setLoading(true)
        const email = res.profileObj.email
        console.log(email)
        loginWithGoogle({ email }).then(res => {
            setLoading(false)
            console.log(res)
            const userData = res.data.user
            context.login(userData)
            props.history.push('/')
        }).catch(err => {
            if (err.response) {
                setLoading(false)
                console.log(err.response.data.message)
                setErrors({ message: err.response.data.message })
            }
            else {
                setLoading(false)
                setErrors({ message: 'Something went wrong.. Please try again later' })
                console.log(err)
            }
        })
    }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} loading={loading} >
                <h1>Login</h1>
                <Form.Input
                    label='Email'
                    placeholder='Email..'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={onChange}
                    error={errors.message ? true : false}

                />

                <Form.Input
                    label='Password'
                    placeholder='Password..'
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={onChange}
                    error={errors.message ? true : false}
                />
                <Link to={'/forgotPassword'} >Forgot Password?</Link>
                <Container>
                    <Button type='submit' primary style={{ marginRight: 10 }}>Sign in</Button>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText='Sign in with google'
                        onSuccess={googleAuthOnSuccess}
                        onFailure={(err) => {
                            console.log(err)
                        }}
                        cookiePolicy='single_host_origin'

                    />
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

export default Login