"use client";

import { Button } from "@/components/ui/button";
import { usePRD } from "@/hooks/use-prd";
import dynamic from "next/dynamic";
import { useState, useEffect, useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";

const Editor: any = dynamic(
  () => import("@tinymce/tinymce-react").then((mod: any) => mod.Editor),
  { ssr: false }
);

type TProps = {
  projectId: string;
  prd?: string;
};

export const TextEditor = ({ projectId, prd }: TProps) => {
  const [editorContent, setEditorContent] = useState<string>(prd || "");
  const [isPending, startTransition] = useTransition();
  const [currentTab, setCurrentTab] = useState<string>("continue-editing");
  const searchParams = useSearchParams();
  const { addPRD } = usePRD();

  // Effect to update editorContent when prd changes
  useEffect(() => {
    if (prd) {
      setEditorContent(prd);
    }
  }, [prd]);

  // Effect to update tab state when searchParams change
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setCurrentTab(tab);
    }
  }, [searchParams]);

  const onPublish = async () => {
    if (editorContent) {
      startTransition(() => {
        addPRD({ projectId, prd: editorContent });
      });
    }
  };

  const onTabChange = (value: string) => {
    setCurrentTab(value);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set("tab", value);
    url.search = searchParams.toString();
    window.history.pushState({}, "", url.toString());
  };

  return (
    <Tabs
      className="flex flex-col space-y-2"
      value={currentTab}
      onValueChange={(value) => {
        onTabChange(value);
      }}
    >
      <div className="flex items-center justify-end w-full">
        <TabsList
          className={cn(
            currentTab === "preview" ? "grid-cols-1" : "grid-cols-2",
            "grid h-fit sm:w-1/2 md:w-[250px]"
          )}
        >
          {currentTab === "preview" ? (
            <TabsTrigger value="continue-editing" asChild>
              <Button variant="primary" size="sm">
                Continue Editing
              </Button>
            </TabsTrigger>
          ) : (
            <>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <Button
                disabled={isPending}
                onClick={onPublish}
                variant="primary"
                size="sm"
              >
                Publish
              </Button>
            </>
          )}
        </TabsList>
      </div>
      <TabsContent value="preview">
        <div className="p-10 bg-slate-50 border border-gray-200 rounded-lg shadow-md">
          {editorContent ? parse(editorContent) : "No content available"}
        </div>
      </TabsContent>

      <TabsContent value="continue-editing">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onInit={(_evt: any, editor: any) => {
            if (editorContent) {
              editor.setContent(editorContent);
            }
          }}
          value={editorContent}
          onEditorChange={(content: string) => {
            setEditorContent(content);
          }}
          init={{
            height: "80dvh",
            menubar: "edit view insert format tools table help",
            plugins: [],
            toolbar:
              "undo redo | formatselect | bold italic underline strikethrough | fontsizeselect fontselect | " +
              "forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
              "blockquote subscript superscript | help",
            autosave_interval: "30s",
            autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
            autosave_restore_when_empty: true,
            autosave_retention: "2m",
            content_css: [
              "//fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
            ],
            font_formats:
              "Arial=arial,helvetica,sans-serif;" +
              "Courier New=courier new,courier,monospace;" +
              "Georgia=georgia,palatino;" +
              "Tahoma=tahoma,arial,helvetica,sans-serif;" +
              "Times New Roman=times new roman,times;" +
              "Verdana=verdana,geneva;" +
              "Roboto=Roboto, sans-serif;",
            toolbar_mode: "sliding",
          }}
        />
      </TabsContent>
    </Tabs>
  );
};
