import { Steps, notification, Row, Col, Form, Checkbox, Button } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import useLocalStorage from "../helpers/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TosInput } from "../components";

const { Step } = Steps;

const CreatePage = () => {
  const [email] = useLocalStorage("email");
  const router = useRouter();

  useEffect(() => {
    if (email === undefined) {
      notification.error({
        title: "Not Logged In",
        message: "You must login to continue to create page."
      });
      router.replace("/login");
    }
  }, [email, router]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Steps current={1}>
        <Step icon={<UserOutlined />} title="Login" />
        <Step icon={<SettingOutlined />} title="Setup" />
        <Step icon={<CheckCircleOutlined />} title="Finish" />
      </Steps>
      <Row justify="space-around">
        <Col>
          <Form initialValues={{ tos: false }} onFinish={handleSubmit}>
            <Form.Item label="Teachers">
              The real website would use the Google Workspace API, but the
              school has disabled Google Cloud.
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
              <TosInput />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Create Fundraiser
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreatePage;
