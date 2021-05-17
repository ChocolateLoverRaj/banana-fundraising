import { Modal, Button } from "antd";
import { CheckOutlined, ReadOutlined } from "@ant-design/icons";
import { useState } from "react";
const TosInput = (props) => {
  const { value, onChange, disabled } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleAccept = () => {
    onChange?.(true);
    setModalOpen(false);
  };

  const handleDecline = () => {
    onChange?.(false);
    setModalOpen(false);
  };

  return (
    <>
      <Button
        disabled={disabled}
        icon={value ? <CheckOutlined /> : <ReadOutlined />}
        onClick={handleOpen}
      >
        {value
          ? "You've agreed to the Terms of Service"
          : "Read Terms of Service"}
      </Button>
      <Modal
        title="Terms of Service"
        visible={modalOpen}
        onCancel={handleClose}
        onOk={handleAccept}
        okText="Accept"
        cancelText="Decline"
        cancelButtonProps={{ onClick: handleDecline }}
      >
        I am not a lawyer.
      </Modal>
    </>
  );
};

export default TosInput;
