import { Button } from "antd";
import Link from "next/link";

const DashboardButton = () => (
  <Button type="primary" key="main">
    <Link href="/dashboard">Go to dashboard</Link>
  </Button>
);

export default DashboardButton;
