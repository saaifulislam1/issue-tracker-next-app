import React from "react";
import IssueForm from "../../_components/IssueForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}
const page = async ({ params }: Props) => {
  const prisma = new PrismaClient();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default page;
