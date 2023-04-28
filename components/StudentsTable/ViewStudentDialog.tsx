import { Student } from "@/api/students/types";
import { AlertDialog, Flex, ProgressBar, Text } from "@adobe/react-spectrum";

type Props = Student;

const ViewStudentDialog = ({
  name,
  progress,
  course,
  lesson,
  module,
}: Props) => (
  <AlertDialog title="View" variant="information" primaryActionLabel="Close">
    <Flex direction="column" gap={"size-100"}>
      <Text>Name of student: {name}</Text>
      <Flex gap="size-100">
        <Text>Progress:</Text>
        <ProgressBar aria-label="student progress" value={progress} />
      </Flex>
      <Text>Course: {course}</Text>
      <Text>Module: {module}</Text>
      <Text>Lesson: {lesson}</Text>
    </Flex>
  </AlertDialog>
);

export default ViewStudentDialog;
