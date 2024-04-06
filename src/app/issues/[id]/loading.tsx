import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetail = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex direction={"row"} gap={"2"} className="mb-2">
        <Skeleton width={"4rem"} />
        <Skeleton width={"3rem"} />
      </Flex>
      <Card className="mt-3">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetail;
