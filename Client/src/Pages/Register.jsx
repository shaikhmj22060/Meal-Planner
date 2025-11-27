import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useAuth } from "../context/AuthContext";
import { replace, useNavigate } from "react-router-dom";

const Register = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const { register, error, clearError, isAuthenticated } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const result = await register(Username, Name, Email, Password);
    console.log(result);
    if (result.success) {
      navigate("/ ", { replace: true });
    }
  };
  useEffect(() => {
    if (isAuthenticated == true) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className="w-full h-screen">
        <div className=" w-full h-screen flex flex-col justify-center items-center">
          <div className=" md:bg-neutral-50 md:shadow-input  md:px-18  md:py-16 rounded-2xl space-y-4">
            <h1 className="text-3xl font-semibold">Signup</h1>
            <div>
              <form>
                <div className="flex flex-col space-y-2 text-md text-neutral-800">
                  <label htmlFor="Name">Enter username </label>
                  <input
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-none outline-none  focus:ring-2 focus:ring-neutral-400 px-3 py-2 bg-white/65  focus:bg-white transition-colors text-neutral-700 duration-300 shadow-input  rounded"
                  />
                  <label htmlFor="Name">Enter username </label>
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-none outline-none  focus:ring-2 focus:ring-neutral-400 px-3 py-2 bg-white/65  focus:bg-white transition-colors text-neutral-700 duration-300 shadow-input  rounded"
                  />
                  <label htmlFor="Name">Enter Email</label>
                  <input
                    type="text"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-none outline-none  focus:ring-2 focus:ring-neutral-400 px-3 py-2 bg-white/65  focus:bg-white transition-colors text-neutral-700 duration-300 shadow-input  rounded"
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-none outline-none  focus:ring-2 focus:ring-neutral-400 px-3 py-2 bg-white/65  focus:bg-white transition-colors duration-300 shadow-input  rounded"
                  />
                  <div className="pt-2">
                    <Button
                      onClick={onSubmit}
                      className={"text-lg w-1/2  font-semibold cursor-pointer"}
                    >
                      Signup
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
