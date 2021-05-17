import { Steps, notification, Row, Col, Form, Button, Result } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import useLocalStorage from "../helpers/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TosInput } from "../components";
import Link from "next/link";
const { Step } = Steps;

const CreatePage = () => {
  const [login] = useLocalStorage("login");
  const router = useRouter();
  const [creating, setCreating] = useState();
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (login === undefined) {
      notification.error({
        title: "Not Logged In",
        message: "You must login to continue to create page."
      });
      router.replace("/login");
    }
  }, [login, router]);

  useEffect(() => {
    creating
      ?.then((res) => {
        setCreating(undefined);
        if (res.status === 201) {
          setCreated(true);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Error creating fundraiser");
      });
  }, [creating]);

  const handleSubmit = () => {
    setCreating(
      fetch("/api/create", {
        method: "POST",
        body: login.email
      })
    );
  };

  return (
    <>
      <Steps current={1 + +created}>
        <Step icon={<UserOutlined />} title="Login" />
        <Step icon={<SettingOutlined />} title="Setup" />
        <Step icon={<CheckCircleOutlined />} title="Finish" />
      </Steps>
      <Row justify="space-around">
        <Col>
          {created ? (
            <Result
              status="success"
              title="Fundraiser Sucessfully Created"
              extra={[
                <Button type="primary">
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              ]}
            />
          ) : (
            <Form initialValues={{ tos: false }} onFinish={handleSubmit}>
              <Form.Item label="Teachers">
                The real website would use the{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://developers.google.com/admin-sdk/directory/v1/guides/manage-groups#get_group"
                >
                  Google Workspace API
                </a>
                , but the school has disabled Google Cloud.
              </Form.Item>
              <Form.Item
                label="I agree to the Terms of Service"
                name="tos"
                rules={[
                  {
                    type: "enum",
                    enum: [true],
                    message: "You must agree to the Terms of Service"
                  }
                ]}
              >
                <TosInput disabled={creating} />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={creating}>
                Create Fundraiser
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CreatePage;
