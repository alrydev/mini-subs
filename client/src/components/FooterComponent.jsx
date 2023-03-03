import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import { AiFillInstagram, AiOutlineTwitter, AiFillLinkedin, AiFillFacebook, AiFillPhone } from "react-icons/ai";
import { HiLocationMarker, HiMail } from "react-icons/hi";

export default function FooterComponent() {
    return (
        <div style={{ fontFamily: "monospace" }} >
            <Row xs={1} md={3} className=" g-4 mt-4 bg-footer py-4">
                <Col>
                    <h4 className='text-center mb-4'>
                        subscribe.ly
                    </h4>
                    <p className='ms-5' style={{ fontFamily: "monospace" }}>
                        <HiLocationMarker /> Jakarta, Indonesia
                    </p>
                    <p className='ms-5'>
                        <AiFillPhone /> 081273183219
                    </p>
                    <p className='ms-5'>
                        <HiMail /> info@sbscrb.com
                    </p>
                </Col>

                <Col >
                    <p className='fw-bold fs-5'>
                        Produk:
                    </p>
                    <p>- Cyber Security</p>
                    <p>- Web Development</p>
                    <p>- Cloud Storage</p>
                </Col>

                <Col >
                    <p className='fw-light fst-italic pointer' style={{ fontSize: "13px" }}>Kebijakan Privasi dan Syarat Ketentuan</p>
                    <p className='fw-bold'>Follow Us On: </p>
                    <div>
                        <AiFillInstagram className='me-2 pointer' style={{ fontSize: "30px" }} />
                        <AiOutlineTwitter className='me-2 pointer' style={{ fontSize: "30px" }} />
                        <AiFillLinkedin className='me-2 pointer' style={{ fontSize: "30px" }} />
                        <AiFillFacebook className='me-2 pointer' style={{ fontSize: "30px" }} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
