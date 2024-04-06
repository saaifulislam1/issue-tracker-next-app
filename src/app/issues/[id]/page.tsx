import { PrismaClient } from "@prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoPencilSharp } from "react-icons/io5";
import Markdown from "react-markdown";

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
      <Box>
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
      </Box>
      <Box>
        <Button>
          <IoPencilSharp />
          <Link href={`/issues/${issue.id}/edit`}> Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
