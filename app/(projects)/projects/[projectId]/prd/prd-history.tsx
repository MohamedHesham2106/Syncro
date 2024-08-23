import { Badge } from "@/components/ui/badge";
import React from "react";

// Utility function to strip HTML tags from a string
const stripHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+>/gi, "");
};

// Function to format date and time
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const optionsDate: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return `${date.toLocaleDateString(
    "en-US",
    optionsDate
  )} ${date.toLocaleTimeString("en-US", optionsTime)}`;
};

type TProps = {
  prds: {
    id: string;
    content: string;
    createdAt: string;
    version: number;
  }[];
};

export const PRDHistory = ({ prds }: TProps) => {
  if (prds.length === 0) return <div>No PRD history</div>;

  return (
    <div className="flex flex-col space-y-5 lg:border-l h-full px-5 py-2">
      <h2 className="font-bold text-lg">History</h2>
      <div className="flex flex-col space-y-2">
        {prds.map((prd) => (
          <div
            key={prd.id}
            className="flex flex-col space-y-2 border border-b-4 bg-slate-50 border-b-slate-200 p-2 rounded-md shadow cursor-pointer hover:shadow-md"
          >
            <div className="flex items-center gap-x-2">
              <Badge className="font-extrabold">V{prd.version}</Badge>
              <time className="text-sm font-bold">
                {formatDateTime(prd.createdAt)}
              </time>
            </div>
            <p className="text-xs text-pretty line-clamp-2">
              {stripHtmlTags(prd.content)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
