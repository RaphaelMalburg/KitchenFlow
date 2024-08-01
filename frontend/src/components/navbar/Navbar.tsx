import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Login } from "../login/Login";
import useAuthStore from "@/store/useAuthStore";
import { CircleUser, MenuIcon } from "lucide-react";
import { logoutAPI } from "@/apis/User";
import { Button } from "../ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EmployeeSelect } from "../employeeSelect/EmployeeSelect";
import logo from "@/assets/kitchen-flow.png";

function Navbar() {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const userAuthorize = useAuthStore((state) => state.authorized);

  useEffect(() => {
    if (userAuthorize) {
      navigate("/dashboard");
    }
  }, [userAuthorize, navigate]);

  const logout = async () => {
    await logoutAPI();
    navigate("/");
  };

  const handleLoginSuccess = () => {
    dialogCloseRef.current?.click();
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-md dark:bg-gray-900">
      <Link className="flex items-center justify-center" to="/">
        <img alt="Hero" className="mx-auto overflow-hidden rounded-t-xl object-cover mr-4" height="70" src={logo} width="70" />
        <span className="sr-only">KitchenFlow</span>
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <div className="  hidden ml-auto md:flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/support">
            Contact
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className=" md:hidden block">
            <Button variant="secondary" className="text-sm font-medium hover:underline underline-offset-4">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/support">Contact</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {userAuthorize ? (
          <>
            <EmployeeSelect />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/dashboard">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link to="/support">
                  <DropdownMenuItem>Support</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Dialog>
            <DialogTrigger className="text-sm font-medium hover:underline underline-offset-4">
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-6">Login to your account</DialogTitle>
                <Login onLoginSuccess={handleLoginSuccess} />
              </DialogHeader>
              <DialogClose asChild>
                <button type="submit" ref={dialogCloseRef}></button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
