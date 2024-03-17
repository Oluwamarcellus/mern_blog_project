import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Root() {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <footer>Hello Footer</footer>
    </>
  );
}