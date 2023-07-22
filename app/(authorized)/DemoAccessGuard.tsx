"use client";

import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DemoAccessGuard({ children }: Props) {
  const searchParams = useSearchParams();
  const isDemoAccess = searchParams.get("demo");
  if (!isDemoAccess) {
    return redirect("/login");
  }
  return <>{children}</>;
}
