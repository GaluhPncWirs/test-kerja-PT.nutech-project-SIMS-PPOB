import Header from "../../components/header/content";
import ContainerRoot from "../../layout/containerRoot/content";
import { Outlet } from "react-router-dom";

export default function ParentHomePage() {
  return (
    <ContainerRoot>
      <div className="pt-5 sm:pt-7 md:pt-20">
        <Header />
        <Outlet />
      </div>
    </ContainerRoot>
  );
}
