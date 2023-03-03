import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config/api';

import web from '../../assets/web.png'

export default function ServicesComponent() {

    // get variants: 
    let { data: variants } = useQuery('variantsCache', async () => {
        const response = await API.get('/variant')
        return response.data.data
    })

    const [showConfirm, setConfirm] = useState(false);

    const handleClose = () => setConfirm(false);
    const handleShow = () => setConfirm(true);

    // check list company
    const [checklist, setChecklist] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    const handleChecklistChange = (event) => {
        const { name, checked } = event.target;
        setChecklist((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(checklist);
    };
    // end ceklis company -----------------------------

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
                                        <small className="text-muted">Rp. {items.price} / {items.subscribe_period_day} days</small>
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
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Subscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group as={Row} controlId="formHorizontalChecklist">
                            <Form.Label column sm={2}>
                                Choose Company
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="checkbox"
                                    label="Option 1"
                                    name="option1"
                                    checked={checklist.option1}
                                    onChange={handleChecklistChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* <Button variant="primary" type="submit">
                            Submit
                        </Button> */}

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
