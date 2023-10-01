import { Outlet } from "react-router-dom";
import { StyledNavbar } from "../../components";


function SharedLayout() {
  return (
    <>
      <StyledNavbar />
      <Outlet />
    </>
  );
};
export default SharedLayout;