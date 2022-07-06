import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session } = useSession();

  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/some" });
    push(data.url);
  };

  const handleSignIn = () => push(`/auth/signIn?callbackUrl=${asPath}`);

  return (
    <div>
      {session ? (
        <>
          <div>You are signed in as {session.user.name}</div>
          <Button onClick={handleSignOut} variant="primary">
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <div>You are not signed in</div>
          <Button onClick={handleSignIn} variant="primary">
            Sign In
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
