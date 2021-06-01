import {
  Steps,
  notification,
  Row,
  Col,
  Form,
  Button,
  Result,
  Input
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import useLocalStorage from "../helpers/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TosInput, DashboardButton } from "../components";
const { Step } = Steps;

const CreatePage = () => {
  const [login, setLogin] = useLocalStorage("login");
  const router = useRouter();
  const [creating, setCreating] = useState();
  const [created, setCreated] = useState(Boolean(login?.setupComplete));

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
    // eslint-disable-next-line
    creating
      ?.then((res) => {
        setCreating(undefined);
        if (res.status === 201) {
          setCreated(true);
          setLogin((login) => ({ ...login, setupComplete: true }));
        } else {
          alert("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Error creating fundraiser");
      });
  }, [creating, setLogin]);

  const handleSubmit = ({ name }) => {
    setCreating(
      fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          email: login.email,
          name
        }),
        headers: [["Content-Type", "application/json"]]
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
              extra={[<DashboardButton key="main" />]}
            />
          ) : (
            <Form initialValues={{ tos: false }} onFinish={handleSubmit}>
              <Form.Item
                label="School Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
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
