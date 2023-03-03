import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import landing from '../assets/landing.png'
import line from '../assets/line.png'

function JumbotronComponent() {
    return (
        <>
            <Container className="d-flex align-items-center container-jumbotron">
                <img src={line} alt='' style={{ position: "absolute", width: "40rem", marginTop: "21rem", marginRight: "1rem" }} />
                <Row className="justify-content-center">
                    <Col md={20} className="text-start ">
                        <h1 className=''>subscribe.ly</h1>
                        <blockquote className="text-start">
                            <p className='fst-italic text-secondary'>Take your company to new heights with our innovative services.</p>
                        </blockquote>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <img className='rounded-5' src={landing} alt='' style={{ width: "90%", position: "relative" }} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default JumbotronComponent;
