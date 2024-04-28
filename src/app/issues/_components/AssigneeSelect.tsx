"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 10 * 1000, //helps in caching for 60s
    retry: 3, //retry 3 time for fetching data
  });
  console.log(users);

  if (error) {
    return null;
  }

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(userId) => {
        axios
          .patch("/api/issues/" + issue.id, {
            assignedToUserId: userId === "unassigned" ? null : userId,
          })
          .catch(() => {
            toast.error("Couldn't save the changes");
          });
        //          "/api/issues/1, 2, 3, 4 anything" till this is the api endpoint
        //                  this the data we are sending along, more like payload
      }}
    >
      <Select.Trigger placeholder="Assign..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.email}
            </Select.Item>
          ))}

          {/* <Select.Item value="{user.id}">sd</Select.Item> */}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
