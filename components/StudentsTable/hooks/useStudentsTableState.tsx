import { getStudents, getStudentsListKeys } from "@/api/students";
import { STUDENTS_PAGE_DEFAULT_LIMIT } from "@/constants/studentTable";
import { SortDescriptor } from "@react-types/shared";
import { useState } from "react";
import { useQuery } from "react-query";

const useStudentsTableState = () => {
  const [limit, setLimit] = useState(STUDENTS_PAGE_DEFAULT_LIMIT);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: getStudentsListKeys({
      page,
      sort: (sortDescriptor?.column as string) ?? "",
      direction: sortDescriptor?.direction ?? "",
      limit,
    }),
    keepPreviousData: true,
    queryFn: () =>
      getStudents({
        limit,
        page,
        direction: sortDescriptor?.direction,
        sort: sortDescriptor?.column as string,
      }),
  });

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleLimitChange = (val: number) => {
    setPage(1);
    setLimit(val);
  };

  return {
    students: data?.students ?? [],
    totalCount: data?.totalCount ?? 0,
    sortDescriptor,
    setSortDescriptor,
    handlePageClick,
    limit,
    handleLimitChange,
  };
};

export default useStudentsTableState;
