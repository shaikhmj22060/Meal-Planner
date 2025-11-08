import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import axios from "axios";
export const Login = () => {
  const [UsernameEmail, setUsernameEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Userdata, setUserdata] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/login", {
        emailOrUsername: UsernameEmail,
        password: Password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUserdata(res.data.name)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setPassword("");
    setUsernameEmail("");
  };
  useEffect(() => {
    const sotreduser = localStorage.getItem("user");
    const user = sotreduser ? JSON.parse(sotreduser) : null;
    setUserdata(user);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className=" bg-neutral-50 shadow-input  px-18 py-16 rounded-2xl space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <div>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-2 text-xl">
              <label htmlFor="Name">Enter username or email</label>
              <input
                type="text"
                value={UsernameEmail}
                onChange={(e) => setUsernameEmail(e.target.value)}
                className="border-none outline-none  focus:ring-2 focus:ring-neutral-400 px-3 py-2 bg-white/65  focus:bg-white transition-colors duration-300 shadow-input  rounded"
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
                  className={
                    "bg-black/80 px-3 py-2 w-1/2 cursor-pointer hover:scale-z-50 hover:bg-black/85 text-white hover:scale-90 transition-all duration-300 shadow-input"
                  }
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
          <div>
            <h1>{Userdata?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
