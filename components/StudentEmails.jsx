import { Row, Col, Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { MdInput } from ".";

const StudentEmails = (props) => {
  const [creating, setCreating] = useState(false);

  const handleNewEmail = () => {
    setCreating(true);
  };

  const handleCancel = () => {
    setCreating(false)
  }

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
      <Modal 
        visible={creating} 
        title="New Email" 
        okText="Send"
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item 
            name={["to", "name"]} 
            label="To - Name" 
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name={["to", "email"]} 
            label="To - Email" 
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="body">
            <MdInput />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StudentEmails;
