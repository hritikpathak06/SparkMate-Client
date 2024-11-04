import Register from "../components/auth/Register";

const RegisterPage = () => {
  return (
    <>
      <div className=" bg-slate-200 h-screen w-full flex">
        <div className=" w-1/2 h-full">
          <Register />
        </div>
        <div className=" bg-red-400 w-1/2 h-full">
          <img
            src="./login.png"
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
