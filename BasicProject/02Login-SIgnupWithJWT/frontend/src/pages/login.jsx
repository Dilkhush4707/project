import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY, HandleError, HandleSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loginInfo, setlogininfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlelogin = (e) => {
    const { name, value } = e.target;
    
    const copydata = { ...loginInfo };
    copydata[name] = value;
    setlogininfo(copydata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return HandleError("feilds are required");
    }
    try {
      const Url = `${API_KEY}/auth/login`;
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();

      const { message, success, jwtToken, name } = result;
      if (success) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(name));
        HandleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        HandleError(message);
      }
    } catch (err) {
      HandleError(err);
    }
  };
  return (
    <div className="container">
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            name="email"
            autoFocus
            onChange={handlelogin}
            placeholder="Enter your email"
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            autoFocus
            onChange={handlelogin}
            value={loginInfo.password}
            placeholder="Enter a strong password"
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          {" "}
          don`t have an account ? <Link to="/signup"> Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
