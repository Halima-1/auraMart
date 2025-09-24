import { useState } from "react";

function Form() {
  const user = [];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    user.push(formData);
  };
  return (
    <>
      <form action="">
        <input type="text" name="fname" placeholder="full name" />
        <input type="email" name="email" placeholder="email address" />
        <input type="button" value="Submit" />
      </form>
    </>
  );
}

export default Form;
