import { Row, Col, Button, Modal, Form, Input } from "antd";
import { useState, useEffect, useContext } from "react";
import { MdInput } from ".";
import { GlobalContext } from '../helpers'

const StudentEmails = (props) => {
  const [creating, setCreating] = useState(false);
  const [createReq, setCreateReq] = useState()
  const [form] = Form.useForm()
  const [login] = useContext(GlobalContext)

  useEffect(() => {
    createReq
      ?.then(res => {
        alert(res.status)
        setCreateReq(undefined)
      })
      .catch(() => {
        alert('error creating email')
      })
  }, [createReq])

  const handleNewEmail = () => {
    setCreating(true);
  };

  const handleCancel = () => {
    setCreating(false)
  }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        setCreateReq(fetch('/api/emails', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: [
            ['Token', login?.email],
            ['Content-Type', 'application/json']
          ]
        }))
      })
  }

  const isLoading = Boolean(createReq)

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
        confirmLoading={isLoading}
        onOk={handleOk}
      >
        <Form form={form}>
          <Form.Item 
            name={["to", "name"]} 
            label="To - Name" 
            rules={[{ required: true }]}
          >
            <Input disabled={isLoading} />
          </Form.Item>
          <Form.Item 
            name={["to", "email"]} 
            label="To - Email" 
            rules={[{ type: "email", required: true }]}
          >
            <Input disabled={isLoading} />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input disabled={isLoading} />
          </Form.Item>
          <Form.Item name="message">
            <MdInput disabled={isLoading} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StudentEmails;
