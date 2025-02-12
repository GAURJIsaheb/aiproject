"use client";

import { SignIn, useSignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const { isSignedIn } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Image
          src={"/starting.jpg"}
          alt="login"
          width={500}
          height={500}
          className="w-full object-contain"
        />
      </div>
      <div className="flex justify-center items-center h-screen">
        <SignIn afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
}
