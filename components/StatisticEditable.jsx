import { Statistic, InputNumber, Spin, Form } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const StatisticEditable = (props) => {
  const { loading, title, value, onChange, prefix, changing, rules } = props;
  const [form] = Form.useForm();
  const [editing, setEditing] = useState();

  const handleClickEdit = () => {
    setEditing(value);
  };

  const formatter = (value) => {
    const handleBlur = () => {
      form.submit();
    };
    const handleFinish = ({ value }) => {
      onChange(value);
      setEditing(undefined);
    };
    return (
      <>
        {editing !== undefined ? (
          <Form initialValues={{ value }} form={form} onFinish={handleFinish}>
            <Form.Item name="value" rules={rules}>
              <InputNumber
                autoFocus
                onBlur={handleBlur}
                onPressEnter={handleBlur}
              />
            </Form.Item>
          </Form>
        ) : (
          <span onDoubleClick={handleClickEdit}>{value}</span>
        )}
      </>
    );
  };

  return (
    <Spin spinning={changing}>
      <Statistic
        formatter={formatter}
        title={
          <>
            {title} <EditOutlined onClick={handleClickEdit} />
          </>
        }
        value={editing ?? value}
        loading={loading}
        prefix={prefix}
      />
    </Spin>
  );
};

export default StatisticEditable;
