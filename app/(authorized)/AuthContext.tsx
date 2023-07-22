import { cookies } from "next/headers";
import { ReactNode, Suspense } from "react";
import DemoAccessGuard from "./DemoAccessGuard";

export default function AuthContext({ children }: { children: ReactNode }) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token");
  if (!accessToken) {
    return (
      <Suspense fallback={null}>
        <DemoAccessGuard>{children}</DemoAccessGuard>
      </Suspense>
    );
  }
  return <>{children}</>;
}
