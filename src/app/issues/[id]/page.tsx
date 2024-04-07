import { PrismaClient } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
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

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap={"4"}>
      <Box className="md:col-span-4 w-full">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction={"column"} gap={"4"} className="md:colspa">
        <EditIssueButton IssueID={issue.id} />
        <DeleteIssueButton IssueID={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
