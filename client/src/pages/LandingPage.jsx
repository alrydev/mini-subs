import React, { useState } from 'react';
import JumbotronComponent from '../components/JumbotronComponent';
import NavbarComponent from '../components/NavbarComponent';
import { Row, Col } from 'react-bootstrap';
import RegisterAuth from '../components/auth/RegisterAuth';
import LoginAuth from '../components/auth/LoginAuth';
import FooterComponent from '../components/FooterComponent';

const LandingPage = () => {
    const [showRegister, setShowRegister] = useState(true);
    const [showLogin, setShowLogin] = useState(true);

    const switchToRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const switchToLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    return (
        <>
            <NavbarComponent />
            <Row className='my-3'>
                <Col sm>
                    <JumbotronComponent />
                </Col>
                <Col sm>
                    {showRegister ? (
                        <RegisterAuth switchToLogin={switchToLogin} />
                    ) : (
                        <LoginAuth switchToRegister={switchToRegister}  />
                    )}
                </Col>
            </Row>
            <FooterComponent/>

        </>
    );
}

export default LandingPage;
