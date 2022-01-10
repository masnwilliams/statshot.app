import Metatags from "@components/Metatags";
import { useContext } from "react";
import { UserContext } from "@lib/context";

export default function UserProfilePage() {

  const { user, username } = useContext(UserContext);

  return (
    <main>
      <Metatags title={username} description={`${username}'s profile`} />
      Hello {username}
    </main>
  );
}