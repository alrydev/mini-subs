import React, { useContext, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../../config/api'
import { UserContext } from '../../context/userContext'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function LoginAuth({ switchToRegister }) {

    const [state, dispatch] = useContext(UserContext)

    const [formLogin, setFormLogin] = useState ({
        email:"",
        password:""
    })

    console.log(formLogin);
    

    const handleChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            console.log(formLogin);

            const response = await API.post('/login', formLogin, config)


            // setTimeout(function () {
            //     window.location.reload();
            // }, 2000); // 3000 ms = 3 detik

            if (response?.status === 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })
                console.log("response: ", response.data.data);

                // setModalLogin(false)
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'LOGIN SUCCESS',
                    showConfirmButton: false,
                    timer: 2000
                })

            }


        } catch (error) {
            console.log(error);
        }
    })

    return (
        <>
            <Container className='mt-5 d-flex justify-content-center pt-5'>
                <Form className='' style={{ width: "75%" }} onSubmit={(e) => handleLogin.mutate(e)}>
                    <h2 className='bluish mb-3'>Login</h2>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" id='email' name='email' placeholder="email" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control id='password' type="password" placeholder="password" name='password' onChange={handleChange} />
                    </Form.Group>

                    <Button className='w-100 bg-bluish bluish border-0 text-white' type="submit">
                        Login
                    </Button>
                    <Button
                        className="fw-light mt-1 text-secondary"
                        style={{ fontSize: "15px", backgroundColor: "transparent", border: "none" }}
                        onClick={switchToRegister}
                    >
                        already have an account? login here
                    </Button>
                </Form>
            </Container>
        </>
    )
}
