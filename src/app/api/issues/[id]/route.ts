import { issueSchema } from "@/app/validationSchema";
import { PrismaClient } from "@prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  //   console.log(body);
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });
  //   console.log(updatedIssue);
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
  const deletedIssue = await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({});
}
