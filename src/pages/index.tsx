import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the app directory home page
    router.push("/");
  }, [router]);

  // This page will never be visible as it redirects immediately
  return null;
}
