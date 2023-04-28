import { allStudentsKeys, editStudent } from "@/api/students";
import { Student } from "@/api/students/types";
import { AlertDialog, Slider, View } from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

type Props = Student;

const EditStudentDialog = ({ id, progress: studentProgress }: Props) => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(studentProgress);

  const { mutate } = useMutation({
    mutationFn: ({ id, progress }: { id: string; progress: number }) =>
      editStudent({ id, progress }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allStudentsKeys });
      ToastQueue.positive("Edited");
    },
    onError: () => {
      ToastQueue.negative("Error");
    },
  });

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
