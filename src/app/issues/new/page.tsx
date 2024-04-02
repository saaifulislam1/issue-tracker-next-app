"use client";
import {
  Button,
  Callout,
  CalloutRoot,
  Text,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// this is the new issue form page
// interface IssueForm {
//   title: string;
//   description: string;
// }

// we will replace this with z
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          {error}
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("Unexpected error occured");
          }
        })}
      >
        <TextField.Root>
          {/* here , the register("title")-> is grabing the title column of the table  */}
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>

        <ErrorMessage>{errors?.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage> {errors?.description?.message}</ErrorMessage>

        <Button className="cursor-pointer" disabled={isSubmitting}>
          Submit New Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
