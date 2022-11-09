import { useFieldArray, useFormContext } from "react-hook-form";
import FriendsFormValues from "./FriendsFormValues";

function useFriendsFormField() {
  const { control, register } = useFormContext<FriendsFormValues>();

  const { fields, append, remove } = useFieldArray<FriendsFormValues>({
    control,
    name: "friends",
  });

  const addNewFriend = () => {
    append({
      name: "",
    });
  };

  const removeFriend = (friendIndex: number) => () => {
    remove(friendIndex);
  };

  return {
    fields,
    register,
    addNewFriend,
    removeFriend,
  };
}

export default useFriendsFormField;
