import { Outlet } from "react-router-dom";
import Sidebar from "../Components/App/sideBar";

export default function AppLayout() {
  return (
    <div className="flex">

        <Sidebar />

      <main className="w-full  overflow-y-auto h-screen ">
        <Outlet />
      </main>
    </div>
  );
}
