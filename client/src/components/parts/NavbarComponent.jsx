import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Offcanvas, Table } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2'

import { GoThreeBars, } from "react-icons/go";
import { UserContext } from '../../context/userContext';

function NavbarComponent() {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, dispatch] = useContext(UserContext)

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "LOGOUT",
                })
                Swal.fire(
                    'Logged Out Success',
                )
            }
        })
    }

    return (
        <Navbar className='bg-navbar' expand="lg">
            <Container>
                <Navbar.Brand >
                    {state.isLogin === true ? (
                        <>
                            {state.user.role === 'admin' ? (
                                <div onClick={() => navigate("/transaction")} >
                                    <span className='fw-light text-light pointer'>
                                        home
                                    </span>
                                </div>
                            ) : (
                                <div onClick={() => navigate("/menu")} >
                                    <span className='fw-light text-light pointer'>
                                        home
                                    </span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div onClick={() => navigate("/auth")} >
                            <span className='fw-light text-light pointer'>
                                home
                            </span>
                        </div>
                    )}
                </Navbar.Brand>
                <Navbar.Brand>

                    <GoThreeBars className='text-white pointer' onClick={handleShow} />

                    <Offcanvas placement="end" show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>subscribe.ly</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Table >
                                <tbody>
                                    {state.isLogin === true ? (
                                        <>
                                            {state.user.role === 'admin' ? (
                                                <>
                                                    <tr className='pointer' onClick={() => navigate("/transaction")}>
                                                        <td >Transactions</td>
                                                    </tr>
                                                    <tr className='pointer' onClick={() => navigate("/add-variant")}>
                                                        <td >Add Variants</td>
                                                    </tr>
                                                    <tr className='pointer'>
                                                        <td onClick={logout}>Logout</td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <>
                                                    <tr className='pointer' onClick={() => navigate("/menu")}>
                                                        <td >Our Services</td>
                                                    </tr>
                                                    {/* <tr className='pointer'>
                                                        <td >My Company</td>
                                                    </tr> */}
                                                        <tr className='pointer' onClick={() => navigate("/add-company")}>
                                                        <td >Add Company</td>
                                                    </tr>
                                                    <tr className='pointer'>
                                                        <td onClick={logout}>Logout</td>
                                                    </tr>
                                                </>
                                            )}
                                        </>
                                    ) : (


                                        <tr className='pointer' onClick={() => navigate("/menu")}>
                                            <td >Our Services</td>
                                        </tr>

                                    )}

                                </tbody>
                            </Table>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Navbar.Brand>
            </Container>
        </Navbar >
    );
}

export default NavbarComponent;