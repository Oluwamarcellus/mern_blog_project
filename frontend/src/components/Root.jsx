import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";


export default function Root() {
  const theme = useSelector((state) => state.theme.mode)

  // useEffect(() => { 
  //   console.log(theme);
  // }, [theme]);
  return (
    <div className={ `${theme}` }>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
}