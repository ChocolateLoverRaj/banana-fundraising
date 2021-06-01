import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Alert,
  notification
} from "antd";
import { useState, useEffect, useContext } from "react";
import { MdInput } from ".";
import { GlobalContext } from "../helpers";
import mdToHtml from "marked";
import * as sanitize from "sanitize-html";
import Link from "next/link";

const StudentEmails = () => {
  const [creating, setCreating] = useState(false);
  const [createReq, setCreateReq] = useState();
  const [form] = Form.useForm();
  const [login] = useContext(GlobalContext);

  useEffect(() => {
    /* eslint-disable-next-line */
    createReq
      ?.then(async (res) => {
        if (res.status === 201) {
          setCreating(false);
          const {
            to: { email: to },
            subject,
            message
          } = form.getFieldsValue();
          const emailId = await res.json();
          notification.success({
            message: "Email Sent",
            description: (
              <>
                Click{" "}
                <a
                  href={`/email?to=${to}&subject=${subject}&body=${sanitize(
                    mdToHtml(message)
                  )}<br><a href="${
                    window.location.origin
                  }/donate?emailId=${emailId}">Click Here To Donate</a>&from=${
                    login?.email
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                to view email.
              </>
            )
          });
        } else {
          alert("Error sending email");
        }
        setCreateReq(undefined);
      })
      .catch((e) => {
        console.log(e);
        alert("error creating email");
      });
  }, [createReq, form, login]);

  const handleNewEmail = () => {
    setCreating(true);
  };

  const handleCancel = () => {
    setCreating(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setCreateReq(
        fetch("/api/emails", {
          method: "POST",
          body: JSON.stringify(values),
          headers: [
            ["Token", login?.email],
            ["Content-Type", "application/json"]
          ]
        })
      );
    });
  };

  const isLoading = Boolean(createReq);

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
          message="Emails will not actually be sent"
          description={
            <>
              The real website would use the{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send"
              >
                Gmail API
              </a>
              , but since the school has disabled it this website doesn't
              actually send emails.
            </>
          }
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
