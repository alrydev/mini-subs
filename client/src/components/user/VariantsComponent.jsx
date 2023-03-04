import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Container, Row, Col, Card, Button, Modal, Form, Badge } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config/api';

import web from '../../assets/web.png'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function VariantsComponent() {

    const [state] = useContext(UserContext)


    // get variants: 
    let { data: variants } = useQuery('variantsCache', async () => {
        const response = await API.get('/variant')
        return response.data.data
    })

    const [showConfirm, setConfirm] = useState(false);

    const handleClose = () => setConfirm(false);
    const handleShow = () => setConfirm(true);




    // handleSubscribe
    const [idCompany, setIdCompany] = useState({
        id: '',
    })

    const handleOnChange = (e) => {
        setIdCompany({
            ...idCompany,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
    }
    let id = parseInt(idCompany)

    const handleSubscribe = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            let formData = new FormData()
            formData.set('id', idCompany)

            const response = await API.patch(`/subscribe/${id}`, formData, idCompany, config)
            if (response?.status === 200) {
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
        <div>
            <Container className="my-5">
                <h2 className="text-center text-dark">Our Services</h2>
                <Row xs={1} md={3} className="g-4 mt-4">
                    {variants?.map((items) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={web} alt='' />
                                <Card.Body>
                                    <Card.Title>{items.name}</Card.Title>
                                    <Card.Text>
                                        {items.description}
                                    </Card.Text>
                                    <Card.Footer className='d-flex justify-content-between align-items-center'>
                                        <small className="text-muted">Rp. {items.price} / {items.subs_period} days</small>
                                        <Button onClick={handleShow}>
                                            Subscribe
                                        </Button>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal
                centered
                show={showConfirm}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Form onSubmit={handleSubscribe}>
                    <Modal.Header closeButton>
                        <Modal.Title>Subscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group as={Row} controlId="formHorizontalChecklist">
                            <Form.Label column sm={2}>
                                Choose Company
                            </Form.Label>
                            <Col sm={10}>
                                {state?.user?.company?.map((items) => (
                                    <Button variant="primary" disabled>
                                        name: {items.name} <Badge bg="white" className="text-dark">id: {items.id}</Badge>
                                        <span className="visually-hidden">unread messages</span>
                                    </Button>
                                ))}

                            </Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder='enter your id company' type="text" name='id' onChange={handleOnChange} />
                            </Form.Group>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer className='justify-content-center'>
                        <Button type='submit' className='px-5' variant="primary">
                            PAY
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
