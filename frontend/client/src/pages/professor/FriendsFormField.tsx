import React from "react";
import useFriendsFormField from "./useFriendsFormField";

const FriendsFormField = () => {
  const { fields, register, addNewFriend, removeFriend } =
    useFriendsFormField();

  return (
    <div>
      <div>
        <input {...register("name")} placeholder="Name" />
        <button type="button" onClick={addNewFriend}>
          + Add friend
        </button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <button type="button" onClick={removeFriend(index)}>
            -
          </button>
          <input {...register(`friends.${index}.name`)} placeholder="Name" />
        </div>
      ))}
    </div>
  );
};

export default FriendsFormField;
