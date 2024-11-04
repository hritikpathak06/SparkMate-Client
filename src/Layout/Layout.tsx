import Navbar from "../components/shared/Navbar";

const Layout = ({ children }: any) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
