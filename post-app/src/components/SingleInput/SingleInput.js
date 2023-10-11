import React from "react";
import { Form } from "react-bootstrap";

function SingleInput({
  setValue,
  setValidRequest,
  error,
  value,
  placeholder,
  handleSubmit,
}) {
  return (
    <Form.Group>
      <Form.Control
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          setValue(event.target.value);
          if (setValidRequest) {
            setValidRequest(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
              handleSubmit();
          }
        }}
      />
      {
        <Form.Text className="text-danger">
          <strong>{error}</strong>
        </Form.Text>
      }
    </Form.Group>
  );
}

export default SingleInput;
