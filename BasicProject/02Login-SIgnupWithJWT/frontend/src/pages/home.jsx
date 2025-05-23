import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { API_KEY, HandleError, HandleSuccess } from "../utils/utils";
function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [product, setProduct] = useState();
  const url = `${API_KEY}/product`;
  const fetchproduct = async () => {
    try {
      const token = localStorage.getItem("token");
     
      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const products = await result.json();
      setProduct(products);
     
    } catch (err) {
      HandleError(err);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
    const token = localStorage.getItem("token");

    fetchproduct();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    HandleSuccess("logout successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      <h1>Welcome {loggedInUser}</h1>
      
      <button
        onClick={() => {
          handleLogout();
        }}
      > 

        logout
      </button>
      <ToastContainer />
    </>
  );
}

export default Home;
