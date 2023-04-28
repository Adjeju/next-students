import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  allStudentsKeys,
  editStudent,
  getStudents,
  getStudentsListKeys,
} from ".";
import { GetStudentsParams } from "./types";
import { ToastQueue } from "@react-spectrum/toast";

export const useGetStudentsQuery = (queryParams: GetStudentsParams) =>
  useQuery({
    queryKey: getStudentsListKeys(queryParams),
    keepPreviousData: true,
    queryFn: () => getStudents(queryParams),
  });

export const useEditStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allStudentsKeys });
      ToastQueue.positive("Edited");
    },
    onError: () => {
      ToastQueue.negative("Error");
    },
  });
};
