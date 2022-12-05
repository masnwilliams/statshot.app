import { useRouter } from "next/router";
import {useEffect, useState} from "react";

export default function Home() {

  const router = useRouter()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        e.preventDefault();

        router.push(`/profile/${username}`);
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, []);

  return (
      <main>

        <div>
          <input
              id="gamertag"
              type="text"
              placeholder="Search username..."
              onChange={() => setUsername}
          />
        </div>
      </main>
  );
}