import authOptions from "@/app/auth/authOption";
import { issueSchema, PatchIssueSchema } from "@/app/validationSchema";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }
  const body = await request.json();
  //   console.log(body);

  // check for all the field validation
  const validation = PatchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  // now before finding issue lets find out if the user really exist in the db, i mean lets
  // make sure the id is not something random sent from ui
  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }
  // then we check actually the issue exist or not
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
  // then finally we update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId },
  });
  //   console.log(updatedIssue);
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
  const deletedIssue = await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({});
}
