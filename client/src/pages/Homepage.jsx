import Products from "../components/Products"
import { product } from "./Products"
import { Card, Col, Row } from "react-bootstrap"
const Homepage = () => {
    return (
        <Row>
            {product.map((prd) => (
                <Col sm={12} md={6} lg={4} xl={3} key={prd._id}>
                    <Products product={prd} />
                </Col>
            ))}
        </Row>
    )
}
export default Homepage