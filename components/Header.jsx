import { Menu } from "antd";
import Image from "next/image";
import Icon from "@ant-design/icons";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { GlobalContext } from "../helpers";
import { useContext } from "react";

const Header = () => {
  const router = useRouter();
  const [login, setLogin] = useContext(GlobalContext);

  const handleSelect = ({ key }) => {
    if (key === "logout") setLogin(undefined);
    else if (key !== "logo") router.replace(key);
  };

  console.log(login);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[router.route]}
      onSelect={handleSelect}
    >
      <Menu.Item
        key="logo"
        icon={
          <Icon
            component={() => <Image src="/logo.png" height={14} width={14} />}
          />
        }
      >
        {/* eslint-disable-next-line */}
        <a
          href="https://sites.google.com/pewaukeeschools.org/banana-custom-apps/home"
          target="_blank"
          rel="noreferrer"
        />
      </Menu.Item>
      <Menu.Item key="/">Banana Fundraising</Menu.Item>
      <Menu.Item key="/space" className={styles.space} />
      {login?.role !== undefined ? (
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      ) : (
        <Menu.Item key="/login" icon={<UserOutlined />}>
          Login
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
