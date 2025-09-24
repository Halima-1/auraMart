import { useState } from "react";
import "./register.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate()
    // const userCart = [];
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    cpass: "",
    password: "",
    username: "",
    cart: []
  });
  const [errData, setErrData] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleValidation = () => {
    const newErr = {};

    if (formData.fname == "") {
      newErr.fname = "name require";
    } else if (formData.email == "") {
      newErr.email = "valid email required";
    } else if (formData.phone == "" || formData.phone.length < 11) {
      newErr.phone = "Invalid phone number";
    } else if (formData.username == "" || formData.username.length < 2) {
      newErr.username = "Invalid username, min 2 character";
    } else if (formData.password == "" || formData.password.length < 8) {
      newErr.password = "Invalid Password, min 8 char";
    } else if (formData.cpass != formData.password) {
      newErr.cpass = "Password does not match";
    }
    setErrData(newErr);
  };

  const handleSubmit = () => {
    handleValidation();
    if (!errData) {
      return;
    }

    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    const emailValidation = users.find((item) => item.email == formData.email);
    if (emailValidation) {
      console.log("Email Already Exist");
      return;
    }

    users.push(formData);
// setFormData({ ...formData, userCart });
// localStorage.setItem("formData", JSON.stringify(formData));
        localStorage.setItem(
          `${formData.fname}'s cart`,
          JSON.stringify(formData.cart)
        );

localStorage.setItem("users", JSON.stringify(users));
          navigate("/login", { replace: true });

  };
  return (
    <div className="register-container">
      {/* <p>{user.name}</p>

      <button onClick={changeUser}>Increase</button> */}

      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <h2 style={({ color: "navy", marginBottom: 30 })}>Sign up</h2>
        <input
          type="text"
          name="fname"
          id=""
          placeholder="Name"
          value={formData.fname}
          onChange={handleChange}
        />

        {errData.fname && <p style={{ color: "red" }}>{errData.fname}</p>}
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={handleChange}
        />
        {errData.email && <p style={{ color: "red" }}>{errData.email}</p>}
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={handleChange}
        />
        {errData.username && <p style={{ color: "red" }}>{errData.username}</p>}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          placeholder="Phone Number"
          onChange={handleChange}
        />
        {errData.phone && <p style={{ color: "red" }}>{errData.phone}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        {errData.password && <p style={{ color: "red" }}>{errData.password}</p>}
        <input
          type="password"
          name="cpass"
          value={formData.cpass}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errData.cpass && <p style={{ color: "red" }}>{errData.cpass}</p>}
        <p style={{ color: "grey" }}>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
        <input className="submit-btn" type="submit" value={"Sign up"} />
      </form>
    </div>
  );
}

export default Register;
