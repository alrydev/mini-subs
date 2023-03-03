import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../config/api';

import cloud from '../assets/cloud.png'
import cyber from '../assets/cyber.png'
import web from '../assets/web.png'

export default function ServicesComponent() {

    // get variants: 
    let { data: variants } = useQuery('variantsCache', async () => {
        const response = await API.get('/variant')
        return response.data.data
    })

    console.log("data variants, ", variants);

    return (
        <>
            <Container className="my-5">
                <h2 className="text-center text-dark">Our Services</h2>
                <Row xs={1} md={3} className="g-4 mt-4">
                {variants?.map((items)=> (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={web} alt=''  />
                            <Card.Body>
                                <Card.Title>{items.name}</Card.Title>
                                <Card.Text>
                                    Streaming Live News
                                </Card.Text>
                                <Card.Footer className='d-flex justify-content-between align-items-center'>
                                    <small className="text-muted">Rp. 200.000</small>
                                    <Button>Subscribe</Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </>
    )
}
