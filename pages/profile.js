import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
  const { data: session } = useSession();

  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/profile" });
    push(data.url);
  };

  const handleSignIn = () => push(`/auth/signIn?callbackUrl=${asPath}`);
  // const handleSignIn = () => signIn();

  return (
    <div>
      {session ? (
        <>
          <h3>You are signed in as {session.user.name}</h3>
          <div className="d-flex mt-3">
            <Button className="me-2" onClick={handleSignOut} variant="primary">
              Sign Out
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3>You are not signed in</h3>
          <Button className="mt-2" onClick={handleSignIn} variant="primary">
            Sign In
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
