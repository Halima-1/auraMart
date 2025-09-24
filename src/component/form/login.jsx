import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
// import { UserContext } from "../App";
function Login() {
  // const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errData, setErrData] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const newErr = {};
  const handleValidation = () => {
    if (formData.email == "") {
      newErr.email = "valid email required";
    } else if (formData.password == "" || formData.password.length < 8) {
      newErr.password = "Invalid Password, min 8 char";
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
    const user = users.filter((item) => item.email == formData.email);
    console.log(formData.email);
    const legit =
      user[0].email == formData.email && user[0].password == formData.password
        ? true
        : false;
    console.log(legit);
    if (legit) {
      newErr.notify = "Login successful, please wait credential";

      localStorage.setItem(
        "validatn",
        JSON.stringify({ isLoggin: true, user: user[0] })
      );
      localStorage.setItem("user", JSON.stringify(user));
      console.log("loggin successfully");
      // userContext.setUser(user[0]);
      navigate("/", { replace: true });
    } else {
      console.log("invalid credential");
      newErr.password = "Invalid credential";
    }
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
        <h2 style={{ color: "navy", marginBottom: 30 }}>Sign In</h2>
        {errData.notify && <p style={{ color: "green" }}>{errData.notify}</p>}

        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={handleChange}
        />
        {errData.email && <p style={{ color: "red" }}>{errData.email}</p>}

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        {errData.password && <p style={{ color: "red" }}>{errData.password}</p>}

        <input className="submit-btn" type="submit" value={"Sign in"} />
      </form>
    </div>
  );
}

export default Login;
