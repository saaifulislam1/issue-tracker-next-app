"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const DeleteIssueButton = ({ IssueID }: { IssueID: number }) => {
  const router = useRouter();
  return (
    <Button
      color="red"
      onClick={async () => {
        axios.delete("/api/issues/" + IssueID);
        router.push("/issues");
        router.refresh();
        toast("Issue Deleted", { autoClose: 2000 });
      }}
      className="cursor-pointer"
    >
      Delete issue
    </Button>
  );
};

export default DeleteIssueButton;
