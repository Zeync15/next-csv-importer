import React from "react";
import { Button } from "react-bootstrap";

const CsvNavigateButton = ({ text, onClick, disabled, customStyle }) => {
  return (
    <Button
      style={{ margin: "10px 10px 10px 0px", ...customStyle }}
      variant="info"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default CsvNavigateButton;
