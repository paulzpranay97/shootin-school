import { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./staticPageHeaders.css"

const StaticPageHeaders = ({ title }) => {

  return (
     <div className="section-full-w-row static-page-headers-container d-flex align-items-center">
        <div className="section-boxed-w-row">
            <Container fluid className="py-3 px-4">
                <Row className="align-items-center">
                {/* Left Section - Title */}
                <Col md={6} xs={12}>
                    <h4 className="fw-bold text-uppercase text-brown mb-0 header-page-name">
                        {title}
                    </h4>
                </Col>

                <Col md={6} xs={12} className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
                    <div className="contact-box bg-white px-4 py-3 shadow-sm button-text-us">
                        <small className="text-muted me-1">Text us</small>
                        <span className="fw-bold text-orange">646-450-7572</span>
                    </div>
                </Col>
                </Row>
            </Container>
        </div>
    </div>
  );
};

export default StaticPageHeaders;
