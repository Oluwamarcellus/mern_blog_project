import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>Hello Nav</nav>
      <main>
        <Outlet />
      </main>
      <footer>Hello Footer</footer>
    </>
  );
}