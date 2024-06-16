import { PrismaClient } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "../_components/EditIssueButton";
import IssueDetails from "../_components/IssueDetails";
import DeleteIssueButton from "../_components/DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "../_components/AssigneeSelect";
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();
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
      {session && (
        <Flex direction={"column"} gap={"4"} className="md:colspa">
          <AssigneeSelect issue={issue} />

          <EditIssueButton IssueID={issue.id} />
          <DeleteIssueButton IssueID={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
