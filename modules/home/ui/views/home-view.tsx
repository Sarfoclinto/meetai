"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export function HomeView() {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "Clinton"}))

  return (
    <div className="flex flex-col gap-y-10">
      <div>{data?.greeting}</div>
    </div>
  );
}
 