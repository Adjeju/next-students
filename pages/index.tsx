import { Content, View } from "@adobe/react-spectrum";
import StundentsTable from "../components/StudentsTable";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "react-query";
import { getStudents, getStudentsListKeys } from "@/api/students";
import { studentsTableBaseQuery } from "@/constants/studentTable";

export default function Home() {
  return (
    <Content minHeight="100vh">
      <View padding="size-150">
        <StundentsTable />
      </View>
    </Content>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getStudentsListKeys(studentsTableBaseQuery),
    () => getStudents(studentsTableBaseQuery)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
