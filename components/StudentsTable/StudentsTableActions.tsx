import {
  ActionButton,
  DialogContainer,
  Item,
  Menu,
  MenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import More from "@spectrum-icons/workflow/More";
import Edit from "@spectrum-icons/workflow/Edit";
import Visibility from "@spectrum-icons/workflow/Visibility";
import { useState } from "react";
import EditStudentDialog from "./EditStudentDialog";
import ViewStudentDialog from "./ViewStudentDialog";
import { Key } from "react";
import { Student } from "@/api/students/types";

type Props = { student: Student };

const StudentsTableActions = ({ student }: Props) => {
  let [dialog, setDialog] = useState<Key>("");

  return (
    <>
      <MenuTrigger>
        <ActionButton isQuiet aria-label="Actions">
          <More />
        </ActionButton>
        <Menu onAction={(key) => setDialog(key)}>
          <Item key="edit" textValue="edit">
            <Edit />
            <Text>Edit</Text>
          </Item>
          <Item key="view" textValue="view">
            <Visibility />
            <Text>View</Text>
          </Item>
        </Menu>
      </MenuTrigger>
      <DialogContainer onDismiss={() => setDialog("")}>
        {dialog === "edit" && <EditStudentDialog {...student} />}
        {dialog === "view" && <ViewStudentDialog {...student} />}
      </DialogContainer>
    </>
  );
};

export default StudentsTableActions;
