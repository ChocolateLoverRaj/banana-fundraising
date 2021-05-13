import GoogleButton from "react-google-button";
import { Row, Col, Form, Input, Button } from "antd";

const TeachersPage = () => {
  return (
    <>
      <Row align="middle">
        <Col span={12}>
          <GoogleButton disabled />
        </Col>
        <Col span={12}>
          The real website would be Google login based, but the school has
          disabled Google Cloud.
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col>For demo purposes, you can type in an email.</Col>
      </Row>
      <Row align="middle">
        <Col span={12}>
          <Form>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: "email" }, { required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <ul>
            <li>
              <pre>someemail@gmail.com</pre> won't work
            </li>
            <li>
              <pre>aaaaaaa##@pewaukeechools.org</pre> is student
            </li>
            <li>
              <pre>aaaaaaa@pewaukeeschools.org</pre> is teacher
            </li>
            <li>
              <pre>admin@pewaukeeschool.org</pre> is school admin
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default TeachersPage;
