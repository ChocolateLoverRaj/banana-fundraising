import { Row, Col, Button } from "antd";

const StudentEmails = (props) => {
  return (
    <Row justify="space-between">
      <Col>
        <h2>Emails</h2>
      </Col>
      <Col>
        <Button>New Email</Button>
      </Col>
    </Row>
  );
};

export default StudentEmails;
