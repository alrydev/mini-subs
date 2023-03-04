import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../../config/api'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function RegisterAuth({ switchToLogin }) {

    const [form, setForm] = useState({
        name:'',
        company_name:'',
        email:'',
        password:'',
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
    }

    const handleRegister = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            let formData = new FormData()
            formData.set('name', form.name)
            formData.set('company_name', form.company_name)
            formData.set('email', form.email)
            formData.set('password', form.password)

            const response = await API.post('/register', formData, form, config)
            // setMessage(alert)

            if (response?.status === 200) {

                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'REGISTER SUCCESS',
                    showConfirmButton: false,
                    timer: 2000
                })
                switchToLogin()
                // setModalRegister(false)
                // switchLogin(true)
            }


        } catch (error) {
            console.log(error);
        }
    })

    return (
        <>
            <Container className='mt-5 d-flex justify-content-center pt-5'>
                <Form className='' style={{ width: "75%" }} onSubmit={(e) => handleRegister.mutate(e)}>
                    <h2 className='mb-3'>Register</h2>
                    <Form.Group className="mb-3">
                        <Form.Control placeholder='name' type="text" name='name' onChange={handleOnChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control placeholder='company name' type="text" name='company_name' onChange={handleOnChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="email" name='email' onChange={handleOnChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="password" name='password' onChange={handleOnChange} />
                    </Form.Group>
                    <Button className='w-100 bg-bluish bluish border-0 text-white' type="submit">
                        Register
                    </Button>
                    <Button
                        className="fw-light mt-1 text-secondary"
                        style={{ fontSize: "15px", backgroundColor: "transparent", border: "none" }}
                        onClick={switchToLogin}
                    >
                        already have an account? login here
                    </Button>
                </Form>
            </Container>
        </>
    )
}
