"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

function Login() {
  const sessions = useSession();
  console.log({ sessions });

  return (
    <div>
      <Button onClick={async () => await signIn("github")}>
        <Github size={24} />
        Continue with github
      </Button>
    </div>
  );
}

export default Login;
