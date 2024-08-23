"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";
import { useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { useProject } from "@/hooks/use-project";
import { useTriggerModal, ModalType } from "@/hooks/use-trigger-modal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .nonempty({ message: "Name is required" }),
  targetedDate: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()); // Check if it's a valid date
    },
    { message: "Targeted Date must be a valid date" }
  ),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
});

export const ProjectModal = () => {
  const user = useUser();
  const { addProject } = useProject();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      targetedDate: "",
      description: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      addProject(values);
    });
  };

  const { isOpen, type, close, open } = useTriggerModal();
  const openModal = isOpen && type === ModalType.AddProject;

  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogTrigger asChild onClick={() => open(ModalType.AddProject)}>
        <Button
          variant="primary"
          className="w-full lg:w-1/5 font-bold flex items-center justify-center gap-x-1"
        >
          <Plus className="w-5 h-5 font-extrabold" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-extrabold text-2xl">
            Add Project
          </DialogTitle>
          <DialogDescription className="text-sm">
            Fill in the fields below to add a new project.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-slate-300" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex justify-between flex-col gap-x-2 p-3"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 md:grid-cols-12 gap-x-1 mb-4">
                  <FormLabel className="flex items-center font-bold text-xs lg:text-sm md:col-span-3 gap-1">
                    <span className="text-red-500">*</span> Name:
                  </FormLabel>
                  <div className="md:col-span-9">
                    <Input
                      disabled={isPending}
                      type="text"
                      name="name"
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage className="text-xs md:text-base py-2">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />

            {/* Owner Field */}
            <div className="items-center grid grid-cols-1 md:grid-cols-12 gap-x-1 mb-4">
              <Label className="flex items-center font-bold text-xs lg:text-sm md:col-span-3 gap-1">
                <span className="text-red-500">*</span> Owner:
              </Label>
              <Input
                type="text"
                name="owner"
                disabled
                className="col-span-9 w-full"
                value={user.user?.emailAddresses.toString() ?? ""}
              />
            </div>

            {/* Targeted Date Field */}
            <FormField
              control={form.control}
              name="targetedDate"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 md:grid-cols-12 gap-x-1 mb-4">
                  <FormLabel className="flex items-center font-bold text-xs lg:text-sm md:col-span-3 gap-1">
                    <span className="text-red-500">*</span> Targeted Date:
                  </FormLabel>
                  <div className="md:col-span-9">
                    <DatePicker onDateChange={field.onChange} />
                    <FormMessage className="text-xs md:text-base py-2">
                      {form.formState.errors.targetedDate?.message}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 md:grid-cols-12 gap-x-1 mb-4">
                  <FormLabel className="flex items-center font-bold text-xs lg:text-sm md:col-span-3 gap-1">
                    <span className="text-red-500">*</span> Description:
                  </FormLabel>
                  <div className="md:col-span-9">
                    <Textarea
                      disabled={isPending}
                      name="description"
                      className="w-full resize-none"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage className="text-xs md:text-base py-2">
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <Separator className="bg-slate-300 my-4" />
            <DialogFooter className="flex items-center justify-center md:px-20">
              <Button
                disabled={isPending}
                type="submit"
                variant="primary"
                className="w-full flex justify-center"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Add Project"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
