import Header from "../../components/header/content";
import ContainerRoot from "../../layout/containerRoot/content";
import { Outlet } from "react-router-dom";

export default function ParentHomePage() {
  return (
    <ContainerRoot>
      <Header />
      <Outlet />
    </ContainerRoot>
  );
}
