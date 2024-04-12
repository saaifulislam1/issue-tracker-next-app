import dynamic from "next/dynamic";
import React from "react";
// import IssueForm from "../_components/IssueForm";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
});

const NewIssue = () => {
  return <IssueForm />;
};

export default NewIssue;
