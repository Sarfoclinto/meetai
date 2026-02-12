import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import AgentListHeader from "@/modules/agent/ui/components/list-header";
import AgentsView, {
  AgentViewLoading,
  AgentViewError,
} from "@/modules/agent/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/modules/agent/ui/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );

  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading />}>
          <ErrorBoundary fallback={<AgentViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
