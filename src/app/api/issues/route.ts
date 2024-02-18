import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { PrismaClient } from "@prisma/client";
// this is where we are hitting: http://localhost:3000/api/issues
// we are hitting into-> api/issues,
// this is schema for data we will recieving
const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "description is required"),
});
// creating instance of Prisma
const prisma = new PrismaClient();

// Post function
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newIssue = prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  console.log((await newIssue).id);
  return NextResponse.json(newIssue, { status: 201 });
}
