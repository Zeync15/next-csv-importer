import React from "react";
import { Button } from "react-bootstrap";

const PaginationButton = ({ text, onClick, disabled }) => {
  return (
    <Button variant="secondary" size="sm" className="mx-1" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

export default PaginationButton;
