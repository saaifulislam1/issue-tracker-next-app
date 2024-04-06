import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssue = () => {
  return (
    <Box>
      <Skeleton width={"8rem"} />
      <Skeleton height={"14rem"} />
    </Box>
  );
};
export default LoadingNewIssue;
