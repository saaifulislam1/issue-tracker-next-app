import z from "zod";

// this is where we are hitting: http://localhost:3000/api/issues
// we are hitting into-> api/issues,
// this is schema for data we will recieving
export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "description is required").max(65535),
});
export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "User Id required")
    .max(255)
    .optional()
    .nullable(),
});
