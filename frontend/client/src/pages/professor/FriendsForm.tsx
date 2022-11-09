import React from "react";
import { FormProvider } from "react-hook-form";
import useFriendsForm from "./useFriendsForm";
import FriendsFormField from "./FriendsFormField";

const FriendsForm = () => {
  const { handleSubmit, methods } = useFriendsForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <FriendsFormField />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default FriendsForm;
