import { PrismaClient } from "@prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
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
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton IssueID={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
