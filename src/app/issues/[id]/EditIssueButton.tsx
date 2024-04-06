import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoPencilSharp } from "react-icons/io5";
interface Props {
  IssueID: number;
}
const EditIssueButton = ({ IssueID }: Props) => {
  return (
    <Button>
      <IoPencilSharp />
      <Link href={`/issues/${IssueID}/edit`}> Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
