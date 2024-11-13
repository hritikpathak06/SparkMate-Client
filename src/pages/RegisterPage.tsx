import Register from "../components/auth/Register";

const RegisterPage = () => {
  return (
    <>
      <div className=" bg-slate-200 md:h-screen h-max w-full flex">
        <div className="md:w-1/2 w-full h-full md:p-0 p-4">
          <Register />
        </div>
        <div className=" bg-red-400 md:block hidden w-1/2 md:h-full h-max">
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
