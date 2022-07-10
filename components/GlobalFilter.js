import { FormControl, InputGroup } from "react-bootstrap";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <InputGroup style={{ width: "30%" }}>
      <InputGroup.Text>Search: </InputGroup.Text>
      <FormControl value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </InputGroup>
  );
};

export default GlobalFilter;
