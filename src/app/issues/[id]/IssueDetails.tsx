import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
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
      <Card className="mt-3 prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
