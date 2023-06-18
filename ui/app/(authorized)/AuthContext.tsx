import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function AuthContext({ children }: { children: ReactNode }) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token");
  if (!accessToken) {
    return redirect("/login");
  }
  return <>{children}</>;
}
