import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createIssueSchema } from "../../validationSchema";
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
