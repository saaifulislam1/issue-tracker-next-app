import { Prisma, PrismaClient, Status } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import delay from "delay";
import React from "react";
import prisma from "@/lib/prisma";
import IssueAction from "../_components/IssueAction";
import Link from "@/app/components/Link";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

const MyIssuePage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  const option: string = searchParams.status;
  const session = await getServerSession(authOptions);
  const serverUserEmail = session?.user?.email;

  const issues = await prisma.issue.findMany({
    where: {
      ...(option !== "ALL" && { status: searchParams.status }),
      assignedToUser: {
        email: serverUserEmail,
      },
    },
  });

  return (
    <div>
      <IssueAction isMyIssue />
      <Table.Root className="mt-2" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden bg-red-600 rounded-md w-fit p-[2px] text-[11px]">
                  {issue.status}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = "force-dynamic";

export default MyIssuePage;
