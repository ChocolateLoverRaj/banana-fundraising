import { Menu } from "antd";
import Image from "next/image";
import Icon from "@ant-design/icons";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item
        key="logo"
        icon={
          <Icon
            component={() => <Image src="/logo.png" height={14} width={14} />}
          />
        }
      />
      <Menu.Item key="name">Banana Fundraising</Menu.Item>
      <Menu.Item key="space" className={styles.space} />
      <Menu.Item key="students">Students</Menu.Item>
      <Menu.Item key="teachers">Teachers</Menu.Item>
    </Menu>
  );
};

export default Header;
