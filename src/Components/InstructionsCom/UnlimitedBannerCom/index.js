import { Container, Row, Col } from "react-bootstrap";
import "./unlimitedbanner.css";
import Unlimited_Banner_img from "../../../Assets/Images/StaticImages/unlimitedbanner.webp"

const UnlimitedBannerCom = () => {
  return (
    <div className="section-full-w-row unlimitedbanner-container d-flex align-items-center">
      <div className="section-boxed-w-row">
        <Container fluid className="py-lg-0 py-md-0 px-0 unlimitedbanner-main-container mx-lg-4 mx-md-4 mx-xs-4">
          <Row className="align-items-center">
           

            
             <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="px-4 p-md-4 p-lg-0 py-3">
              <div className="unlimitedbanner-image-wrapper">
                <img
                  src={Unlimited_Banner_img}
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

export default UnlimitedBannerCom;
