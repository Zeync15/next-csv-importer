import React from "react";
import { Form, Button, ListGroup, Container } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BsGithub, BsTwitter, BsGoogle } from "react-icons/bs";

export const providers = [
  {
    name: "Github",
    Icon: BsGithub,
  },
  {
    name: "Twitter",
    Icon: BsTwitter,
  },
  {
    name: "Google",
    Icon: BsGoogle,
  },
];

const SignIn = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 5000);
    return <div>You area already signed in</div>;
  }
// https://youtu.be/tgrvKGPmI04?t=1974
  return (
    <Container className="w-25 mt-5 border">
      <Form className="m-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>

        <div className="d-flex justify-content-center my-3">
          <div>-----------------or-----------------</div>
        </div>

        <ListGroup>
          {providers.map(({ name, Icon }) => (
            <ListGroup.Item
              className="mb-3 p-2 w-100 border rounded text-center d-flex align-items-center justify-content-center"
              key={name}
              action
              variant='secondary'
            >
              {<Icon />} <span className="ms-2">Sign in with {name} </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form>
    </Container>
  );
};

export default SignIn;
