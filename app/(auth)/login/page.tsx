"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

function Login() {
  return (
    <div>
      <Button onClick={() => signIn("github")}>
        <Github size={24} />
        Continue with github
      </Button>
    </div>
  );
}

export default Login;
