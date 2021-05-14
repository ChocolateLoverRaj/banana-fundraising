import { Steps, notification } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import useLocalStorage from "../helpers/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    alert(email);
  }, [email, router]);

  return (
    <Steps current={1}>
      <Step icon={<UserOutlined />} title="Login" />
      <Step icon={<SettingOutlined />} title="Setup Route" />
      <Step icon={<CheckCircleOutlined />} title="Finish" />
    </Steps>
  );
};

export default CreatePage;
