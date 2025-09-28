import { useState } from "react";
import "./register.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  fetchSignInMethodsForEmail } from "firebase/auth";
import { async } from "@firebase/util";
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
  const handleValidation =async()=>{
    const newErr = {};

    try {
      // check if email already exists
      const providers = await fetchSignInMethodsForEmail(auth, formData.email);
  
      if (providers.length > 0) {
        // user already exists -> log them in
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Logged in:", userCredential.user);
        alert("Welcome back! You are logged in.");
        navigate("/login", { replace: true });
      } else {
        // new user -> create account
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password, formData.phoneNumber);
        console.log("New account created:", userCredential.user);
        navigate("/login", { replace: true });
      }
    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        newErr.notify="⚠️ This email is already registered. Please log in instead.";
      } else if (error.code === "auth/invalid-email") {
        newErr.notify ="⚠️ Please enter a valid email address.";
      } else if (error.code === "auth/missing-password") {
        newErr.notify ="⚠️ Please input a password.";
      } 
      else if (error.code === "auth/weak-password") {
        newErr.notify ="⚠️ Password must be at least 6 characters long.";
      } 
      else {
        newErr.notify ="⚠️ Something went wrong. Please try again.";
      }
      
      console.error(error);
      setErrData(newErr)
      // alert(error.message);
    } 
  }
  const signIn = (e)=>{
    e.preventDefault()
        handleValidation();
    if (!errData) {
      console.log('log in successful');

        }
     }
  const handleSubmit = () => {
  //   handleValidation();
  //   if (!errData) {
  //     return;
  //   }
   

    
//     const users = localStorage.getItem("users")
//       ? JSON.parse(localStorage.getItem("users"))
//       : [];

//     const emailValidation = users.find((item) => item.email == formData.email);
//     if (emailValidation) {
//       console.log("Email Already Exist");
//       return;
//     }

//     users.push(formData);
// // setFormData({ ...formData, userCart });
// // localStorage.setItem("formData", JSON.stringify(formData));
//         localStorage.setItem(
//           `${formData.fname}'s cart`,
//           JSON.stringify(formData.cart)
//         );
// localStorage.setItem("users", JSON.stringify(users));
//           navigate("/login", { replace: true });

  };
  return (
    <div className="register-container">
      {/* <p>{user.name}</p>

      <button onClick={changeUser}>Increase</button> */}

      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          signIn();
        }}
      >
        <h2 style={({ color: "navy", marginBottom: 30 })}>Sign up</h2>
        {/* <input
          type="text"
          name="fname"
          id=""
          placeholder="Name"
          value={formData.fname}
          onChange={handleChange}
        /> */}
        {errData.notify && <p style={{ color: "red" }}>{errData.notify}</p>}

        {errData.fname && <p style={{ color: "red" }}>{errData.fname}</p>}
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="email"
          onChange={handleChange}
        />
        {/* {errData.email && <p style={{ color: "red" }}>{errData.email}</p>}
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
        /> */}
        {errData.phone && <p style={{ color: "red" }}>{errData.phone}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        {/* {errData.password && <p style={{ color: "red" }}>{errData.password}</p>} */}
        <input
          type="number"
          name="num"
          value={formData.phoneNumber}
          placeholder="phone number"
          onChange={handleChange}
        />
        {/* {errData.cpass && <p style={{ color: "red" }}>{errData.cpass}</p>} */}
        <p style={{ color: "grey" }}>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
        <input className="submit-btn" type="button" onClick={signIn} value={"Sign up"} />
      </form>
    </div>
  );
}

export default Register;
