import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function IssueAction() {
  return (
    <div>
      <Button>
        <Link href="/issues/new" className="text-white">
          New Issue
        </Link>
      </Button>
    </div>
  );
}

export default IssueAction;
