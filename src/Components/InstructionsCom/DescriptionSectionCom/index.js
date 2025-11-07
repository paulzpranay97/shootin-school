import { Container, Row, Col } from "react-bootstrap";
import "./descriptionsection.css";

const DescriptionSectionCom = ({ title, image, description = [] }) => {
  return (
    <div className="section-full-w-row description-section-com-container d-flex align-items-center">
      <div className="section-boxed-w-row">
        <Container fluid className="py-lg-0 py-md-0 px-0 des-main-container mx-lg-4 mx-md-4 mx-xs-4">
          <Row className="align-items-center">
           

            {/* ==== Right Content ==== */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex flex-column align-self-start mt-4 mt-md-0">
              <div className="des-content p-2 p-md-4 p-lg-4 p-sm-2">
                <div className="des-title-container mb-3">
                  <h4 className="des-title text-white fw-bold text-uppercase">
                    {title}
                  </h4>
                </div>

                <ul className="des-description list-unstyled">
                  {description.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>

              </div>
            </Col>

             <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="px-4 p-md-4 p-lg-0 py-3">
              <div className="des-image-wrapper">
                <img
                  src={image}
                  alt={title}
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DescriptionSectionCom;
