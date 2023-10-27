"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Auth({ children }: any) {
    const router = useRouter();
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/login");
      },
    });
  
    if (status === "loading") {
      return <div>Loading ...</div>;
    }
    return children;
  }