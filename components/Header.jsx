import { Menu } from "antd";
import Image from "next/image";
import Icon from "@ant-design/icons";

const Header = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item
        key="logo"
        icon={
          <Icon
            component={(props) => (
              <Image src="/logo.png" height={14} width={14} />
            )}
          />
        }
      />
      <Menu.Item key="name">Banana Fundraising</Menu.Item>
    </Menu>
  );
};

export default Header;
