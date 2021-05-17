import { Statistic, InputNumber } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const StatisticEditable = (props) => {
  const { loading, title, value, onChange, prefix } = props;

  const [editing, setEditing] = useState();

  const handleClickEdit = () => {
    setEditing(value);
  };

  const formatter =
    editing !== undefined
      ? (value) => {
          const handleChange = (value) => {
            setEditing(value);
          };
          const handleBlur = () => {
            onChange(editing);
            setEditing(undefined);
          };
          return (
            <InputNumber
              autoFocus
              onBlur={handleBlur}
              value={value}
              onChange={handleChange}
            />
          );
        }
      : undefined;

  return (
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
  );
};

export default StatisticEditable;
