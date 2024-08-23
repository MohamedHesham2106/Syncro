"use client";
import { trpc } from "@/app/_trpc/client";
import { TextEditor } from "./text-editor";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { PRDHistory } from "./prd-history";

type TProps = {
  params: {
    projectId: string;
  };
};
export default function PRDPage({ params: { projectId } }: Readonly<TProps>) {
  const {
    data: prds,
    isLoading,
    isRefetching,
  } = trpc.getPRDs.useQuery(
    { projectId },
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isRefetching) {
    return (
      <div className="flex flex-col space-y-2 p-4 bg-indigo-50 border-2 border-indigo-400 rounded-lg m-5">
        <div className="flex items-center gap-x-2 font-bold">
          <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
          Loading
        </div>
        <p className="pl-8 text-sm">Publishing new changes, please wait</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-12 p-5 gap-5 ">
        <div className="col-span-9 min-h-[90dvh] ">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-x-2 justify-end">
              <Skeleton className="w-20 h-8" />
              <Skeleton className="w-20 h-8" />
            </div>
            <Skeleton className="h-[80dvh] w-full" />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 p-5 gap-5 ">
      <div className="col-span-9 min-h-[90dvh]">
        <TextEditor
          projectId={projectId}
          prd={prds ? prds[0].content : "Please enter your PRD here"}
        />
      </div>
      <div className="col-span-3">
        <PRDHistory prds={prds ?? []} />
      </div>
    </section>
  );
}
