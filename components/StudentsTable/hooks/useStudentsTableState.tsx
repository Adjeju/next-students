import { useGetStudentsQuery } from "@/api/students/hooks";
import { GetStudentsParams } from "@/api/students/types";
import { studentsTableBaseQuery } from "@/constants/studentTable";
import { SortDescriptor } from "@react-types/shared";
import { useState } from "react";

const useStudentsTableState = () => {
  const [queryParams, setQueryParams] = useState<GetStudentsParams>(
    studentsTableBaseQuery
  );

  const { data } = useGetStudentsQuery(queryParams);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setQueryParams((prev) => ({ ...prev, page: selected + 1 }));
  };

  const handleLimitChange = (val: number) => {
    setQueryParams((prev) => ({ ...prev, page: 1, limit: val }));
  };

  const handleDescriptorChange = ({
    column,
    direction = "ascending",
  }: SortDescriptor) => {
    setQueryParams((prev) => ({
      ...prev,
      sort: column?.toString() ?? "",
      direction,
    }));
  };

  return {
    queryParams,
    students: data?.students ?? [],
    totalCount: data?.totalCount ?? 0,
    handlePageClick,
    handleLimitChange,
    handleDescriptorChange,
  };
};

export default useStudentsTableState;
