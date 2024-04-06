import { PrismaClient } from "@prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoPencilSharp } from "react-icons/io5";

import EditIssueButton from "./EditIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound();
  const prisma = new PrismaClient();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  console.log(issue);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Box></Box>
      <Box>
        <EditIssueButton IssueID={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
