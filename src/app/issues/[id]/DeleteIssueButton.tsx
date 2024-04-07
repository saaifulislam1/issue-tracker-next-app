"use client";
import Spinner from "@/app/components/Spinner";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteIssueButton = ({ IssueID }: { IssueID: number }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  return (
    <Button
      color="red"
      onClick={async () => {
        try {
          setIsDeleting(true);
          axios.delete("/api/issues/" + IssueID);
          router.push("/issues");
          router.refresh();
          toast("Issue Deleted", { autoClose: 2000 });
        } catch (error) {
          setIsDeleting(false);
          toast.error(`${error} occured, couldn't delete issue `);
        }
      }}
      className="cursor-pointer"
      disabled={isDeleting}
    >
      Delete issue {isDeleting && <Spinner></Spinner>}
    </Button>
  );
};

export default DeleteIssueButton;
