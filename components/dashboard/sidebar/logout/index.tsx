"use client";

import Confirmation from "@/components/confirmation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Logout() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handler = async () => {
    await signOut();
    router.replace("/");
  };
  return (
    <>
      <button
        onClick={() => setShowAlert(true)}
        className="rounded-full w-full py-2 text-xs bg-gray-300 text-blue-800 font-semibold hover:bg-blue-800 hover:text-white transition-all duration-500"
      >
        Logout
      </button>
      <Confirmation
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        callBack={handler}
        title="Do you still want to logout?"
      />
    </>
  );
}

export default Logout;
