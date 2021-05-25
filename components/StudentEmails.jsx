import { Row, Col, Button, Modal, Form, Input, Alert, message } from "antd";
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
        if (res.status === 201) {
          setCreating(false)
          message.success('Email Sent')
        } else {
          alert('Error sending email')
        }
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
        <Alert 
          message='Emails will be sent from `testing@sparkpostbox.com`'
          description={
            <>The real website would use the <a target='_blank' href='https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send'>Gmail API</a>, but since the school has disabled it this website uses <a target='_blank' href='https://sparkpost.com'>Sparkpost</a> to send emails.
            </>}
        />
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
