import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { createUser } from '../utils/API'



function AddUser(props) {


    const { onChange, onSubmit, values } = useForm(registerUser, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: '',
        address: '',
        reset_answer: ''
    })
    const [errors, setErrors] = useState({})
    const [reset_question, setReset_question] = useState('')
    const questionsOptions = [
        { key: 0, value: 'In what city were you born?', text: 'In what city were you born?' },
        { key: 1, value: 'What is the name of your favorite pet', text: 'What is the name of your favorite pet' },
        { key: 2, value: 'What is your favorite food', text: 'What is your favorite food' },
        { key: 3, value: 'What is the name of your first school?', text: 'What is the name of your first school?' },
        { key: 4, value: 'What is your favorite club', text: 'What is your favorite club' }
    ]

    function registerUser() {
        values.reset_question = reset_question
        console.log(values)
        createUser(values).then(res => {
            console.log(res)
            props.history.push('/')
        }).catch(err => {
            console.log(err)
            if (err.response) {
                console.log(err.response)
                if ((err.response.data.error.messages) !== undefined) {
                    let errorsData = {}
                    const resErrors = err.response.data.error.err.messages.errors
                    console.log(resErrors)
                    console.log(resErrors)
                    resErrors.forEach(element => {
                        errorsData[element.field] = `${element.field} ${element.message}`
                    });
                    setErrors(errorsData)
                }
                else {
                    setErrors({ reset_question: 'Please select a question' })
                }

            } else {
                console.log(err)
            }
        })
    }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit}>
                <h1>Add New User</h1>

                <Form.Input
                    label='Email'
                    placeholder='Email'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}


                />
                <Form.Input
                    label='Name'
                    placeholder='Name'
                    name='name'
                    type='text'
                    value={values.name}
                    onChange={onChange}
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
                <Button type='submit' primary>Sign up</Button>
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

export default AddUser