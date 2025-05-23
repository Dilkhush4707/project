import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY, HandleError, HandleSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [signupInfo, setSignupinfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const handleSignup = (e) => {
    const { name, value } = e.target;
   
    const copydata = { ...signupInfo };
    copydata[name] = value;
    setSignupinfo(copydata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return HandleError("feilds are required");
    }
    try {
      const Url = `${API_KEY}/auth/signup`;
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      
      const {message ,success}=result;
      if(success){
        HandleSuccess(message);
        setTimeout(()=>{
        navigate('/login');
        },1000)
      }else{
        HandleError(message);
      }

    } catch (err) {
      HandleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            id="name"
            autoFocus
            onChange={handleSignup}
            placeholder="Enter name"
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            name="email"
            autoFocus
            onChange={handleSignup}
            placeholder="Enter your email"
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            autoFocus
            onChange={handleSignup}
            value={signupInfo.password}
            placeholder="Enter a strong password"
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          {" "}
          Already have an account ? <Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
