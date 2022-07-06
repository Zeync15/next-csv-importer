import React from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// export const getServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);

//   if (!session)
//     return {
//       redirect: {
//         destination: "/auth/signIn",
//       },
//     };

//   return {
//     props: { session },
//   };
// };

const Protected = () => {
  const {push} = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
    push('/auth/signIn')
    }
  });

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return <div>You are unauthenticated, this is a protected page.</div>;
  }

  return <div>{session.user.email} You are authenticated</div>;
};

export default Protected;
