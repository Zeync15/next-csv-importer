import React, { useState } from "react";
import { Form, Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BsGithub, BsGoogle } from "react-icons/bs";

export const providers = [
  {
    name: "Github",
    provider_name: "github",
    Icon: BsGithub,
  },
  {
    name: "Google",
    provider_name: "google",
    Icon: BsGoogle,
  },
];

const SignIn = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (status === "loading") return <div>Loading...</div>;

  if (session) push("/");

  const handleOAuthSignIn = (provider) => signIn(provider);

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn("email", { email, redirect: false });
  };

  return (
    <Row className="mt-5 d-flex justify-content-center">
      <Col xs={10} md={7} lg={6} xl={5} className="border p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>

          <div className="d-flex justify-content-center my-3">
            <div>-----------------or-----------------</div>
          </div>
        </Form>

        <ListGroup>
          {providers.map(({ name, provider_name, Icon }) => (
            <ListGroup.Item
              className="mb-3 p-2 w-100 border rounded text-center d-flex align-items-center justify-content-center"
              key={name}
              action
              variant="secondary"
              onClick={() => handleOAuthSignIn(provider_name)}
            >
              {<Icon />} <span className="ms-2">Sign in with {name} </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default SignIn;
