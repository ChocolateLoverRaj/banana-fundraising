import { Row, Col, Input } from "antd";
import Markdown from "react-markdown";

const MdInput = (props) => {
  const { value, onChange, disabled } = props;

  const handleChange = ({ target: { value } }) => {
    onChange?.(value);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2>Message</h2>
        </Col>
        <Col span={12}>
          <h2>Preview</h2>
        </Col>
      </Row>
      <Row style={{ height: "200px" }}>
        <Col span={12}
            style={{ overflow: 'auto', maxHeight: '100%', resize: 'none' }}>
          <Input.TextArea
            value={value}
            onChange={handleChange}
            style={{height: '100%'}}
            disabled={disabled}
          />
        </Col>
        <Col span={12} style={{maxHeight: '100%', overflow: 'auto'}}>
          <Markdown>{value}</Markdown>
        </Col>
      </Row>
    </>
  );
};

export default MdInput;
