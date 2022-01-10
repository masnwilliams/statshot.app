import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home(props) {

  const router = useRouter()

  useEffect(() => {
    const listener = e => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        e.preventDefault();

        router.push(`/profile/${document.getElementById("gamertag").value}`);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, []);

  return (
    <main>
      <div className="card">
          <input id="gamertag" className="w-full rounded mr-4" type="text" placeholder="Search gamertag..." />
      </div>
    </main>
  );
}
