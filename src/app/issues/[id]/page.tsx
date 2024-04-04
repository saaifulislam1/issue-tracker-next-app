// "use client";
import { PrismaClient } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound();
  const prisma = new PrismaClient();
  await delay(1000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  console.log(issue);
  return (
    <div>
      <Heading color="violet" className="text-2xl">
        {issue.title}
      </Heading>{" "}
      <Flex direction={"row"} gap={"2"} className="mb-2">
        <i className="bg-slate-300 px-2 py-[1px] text-center text-[10px]">
          {issue.status}
        </i>
        <p className="italic text-[10px]">{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="mt-3">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
