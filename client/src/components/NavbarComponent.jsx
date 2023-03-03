import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,  Offcanvas, Table } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import { GoThreeBars,  } from "react-icons/go";

function NavbarComponent() {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar className='bg-navbar' expand="lg">
            <Container>
                <Navbar.Brand >
                    <div onClick={() => navigate("/")} >
                        <span className='fw-light text-light pointer'>
                            home
                        </span>
                    </div>
                </Navbar.Brand>
                <Navbar.Brand>

                    <GoThreeBars className='text-white pointer' onClick={handleShow} />

                    <Offcanvas placement="end" show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Table >
                                <tbody>
                                    <tr className='pointer' onClick={() => navigate("/menu")}>
                                        <td >Our Services</td>
                                    </tr>
                                    <tr className='pointer'>
                                        <td >My Company</td>
                                    </tr>
                                    <tr className='pointer' onClick={() => navigate("/transaction")}>
                                        <td >Transactions</td>
                                    </tr>
                                    <tr className='pointer'>
                                        <td >Logout</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;