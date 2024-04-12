import { Prisma, PrismaClient } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import delay from "delay";
import React from "react";
import IssueAction from "./_components/IssueAction";
import Link from "../components/Link";

const IssuePage = async () => {
  const prisma = new PrismaClient();
  const issues = await prisma.issue.findMany();
  console.log(issues);

  return (
    <div>
      <IssueAction />
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

export default IssuePage;
