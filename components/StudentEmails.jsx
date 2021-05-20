import { Row, Col, Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { MdInput } from ".";

const StudentEmails = (props) => {
  const [creating, setCreating] = useState(false);

  const handleNewEmail = () => {
    setCreating(true);
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <h2>Emails</h2>
        </Col>
        <Col>
          <Button onClick={handleNewEmail}>New Email</Button>
        </Col>
      </Row>
      <Modal visible={creating} title="New Email" okText="Send">
        <Form>
          <Form.Input name="to" label="To" rules={[{ type: "email" }]}>
            <Input />
          </Form.Input>
          <Form.Input
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Input>
          <Form.Input name="body">
            <MdInput />
          </Form.Input>
        </Form>
      </Modal>
    </>
  );
};

export default StudentEmails;
