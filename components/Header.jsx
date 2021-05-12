import { Menu } from "antd";
import Image from "next/image";
import Icon from "@ant-design/icons";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleSelect = ({ key }) => {
    if (key !== "/logo") router.replace(key);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[router.route]}
      onSelect={handleSelect}
    >
      <Menu.Item
        key="/logo"
        icon={
          <Icon
            component={() => <Image src="/logo.png" height={14} width={14} />}
          />
        }
      >
        <a
          href="https://sites.google.com/pewaukeeschools.org/banana-custom-apps/home"
          target="_blank"
        />
      </Menu.Item>
      <Menu.Item key="/">Banana Fundraising</Menu.Item>
      <Menu.Item key="/space" className={styles.space} />
      <Menu.Item key="/students">Students</Menu.Item>
      <Menu.Item key="/teachers">Teachers</Menu.Item>
    </Menu>
  );
};

export default Header;
