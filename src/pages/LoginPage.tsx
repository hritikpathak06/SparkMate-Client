import Login from "../components/auth/Login";

const LoginPage = () => {
  return (
    <>
      <div className=" bg-slate-200 h-screen w-full flex">
        <div className=" md:block hidden bg-red-400 w-1/2 h-full">
          <img
            src="./login.png"
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
        <div className=" md:w-1/2 w-full h-full md:p-0 p-4">
          <Login />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
