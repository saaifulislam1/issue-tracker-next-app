import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
type Props = { isMyIssue?: boolean };
function IssueAction(props: Props) {
  const { isMyIssue = false } = props;
  return (
    <Flex mb={"5"} justify={"between"}>
      <IssueStatusFilter isMyIssue />
      <Button>
        <Link href="/issues/new" className="text-white">
          New Issue
        </Link>
      </Button>
    </Flex>
  );
}

export default IssueAction;
