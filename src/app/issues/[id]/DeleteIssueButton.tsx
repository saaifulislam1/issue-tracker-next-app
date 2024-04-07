"use client";
import { Button } from "@radix-ui/themes";
const DeleteIssueButton = ({ IssueID }: { IssueID: number }) => {
  return <Button color="red">Delete issue</Button>;
};

export default DeleteIssueButton;
