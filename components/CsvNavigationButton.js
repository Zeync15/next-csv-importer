import React from "react";
import { Button } from "react-bootstrap";

const CsvNavigateButton = ({ text, onClick, disabled, customStyle }) => {
  return (
    <Button
      style={{ marginLeft: "10px", marginBottom: "10px", ...customStyle }}
      variant="info"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default CsvNavigateButton;
