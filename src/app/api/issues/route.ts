import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "../../validationSchema";
// creating instance of Prisma
const prisma = new PrismaClient();

// Post function
export async function POST(request: NextRequest) {
  const body = await request.json();
  // sending the content to validate at createIssueSchema file
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  console.log("ok till validation");
  // if everything is ok
  const newIssue = prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  console.log((await newIssue).id);

  return NextResponse.json(newIssue, { status: 201 });
}
