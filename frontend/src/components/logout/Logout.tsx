import { Button } from "../ui/button";
import { logoutAPI } from "@/apis/User";

function Logout() {
  const logout = async () => {
    await logoutAPI();
  };
  return (
    <Button variant={"secondary"} onClick={async () => await logout()}>
      Logout
    </Button>
  );
}

export default Logout;
