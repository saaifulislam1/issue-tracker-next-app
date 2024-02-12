import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { PrismaClient } from "@prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
const prisma = new PrismaClient();
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
