import { useEditStudentMutation } from "@/api/students/hooks";
import { Student } from "@/api/students/types";
import { AlertDialog, Slider, View } from "@adobe/react-spectrum";
import { useState } from "react";

type Props = Student;

const EditStudentDialog = ({ id, progress: studentProgress }: Props) => {
  const [progress, setProgress] = useState(studentProgress);

  const { mutate } = useEditStudentMutation();

  const handleEdit = () => mutate({ id, progress });

  return (
    <AlertDialog
      title="Edit"
      variant="confirmation"
      primaryActionLabel="Edit"
      cancelLabel="Cancel"
      onPrimaryAction={handleEdit}
    >
      <View>
        <Slider
          label="Progress"
          width="100%"
          defaultValue={progress}
          onChange={setProgress}
        />
      </View>
    </AlertDialog>
  );
};

export default EditStudentDialog;
