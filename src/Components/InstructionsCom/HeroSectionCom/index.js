import { Container, Row, Col } from "react-bootstrap";
import "./herosection.css";

const HeroSectionCom = ({ title, image, description = [], buttonLink }) => {
  return (
    <div className="section-full-w-row hero-section-com-container d-flex align-items-center">
      <div className="section-boxed-w-row">
        <Container fluid className="py-lg-4 py-md-0 px-3">
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="position-relative">
              <div className="hero-image-wrapper">
                <img
                  src={image}
                  alt={title}
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </Col>

            {/* ==== Right Content ==== */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex flex-column align-self-start mt-4 mt-md-0">
              <div className="hero-content p-0 p-md-2 p-lg-5">
                <div className="hero-title-container mb-3">
                  <h4 className="hero-title text-white fw-bold text-uppercase">
                    {title}
                  </h4>
                </div>

                <ul className="hero-description list-unstyled">
                  {description.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>

                {buttonLink && (
                  <a
                    href={buttonLink}
                    className="btn btn-orange mt-3 fw-semibold px-4 py-2"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSectionCom;
