import { Link, Outlet } from "react-router-dom";
import { CookingPot, Home, Menu, NotebookPen, ShoppingBasket, TableProperties, User } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect } from "react";
import useStations from "@/store/useStationsStore";
import { getStation } from "@/apis/Stations";

export function Dashboard() {
  const setStations = useStations((state) => state.setStations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationData = await getStation();
        if (stationData !== undefined) setStations(stationData.data); // Update store with fetched data
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchData(); // Call the function on component mount
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[5px] lg:px-6"></div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard/recipes">
                <NotebookPen className="h-4 w-4" />
                Recipes
              </Link>
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard/stations">
                <CookingPot className="h-4 w-4" />
                Stations
              </Link>
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard/employees">
                <User className="h-4 w-4" />
                Employees
              </Link>

              <h1 className="flex items-center gap-3 rounded-lg  px-3 py-2  text-gray-400">
                <ShoppingBasket className="h-4 w-4" />
                Purchase List | Comming soon...
              </h1>

              <h1 className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all text-gray-400">
                <TableProperties className="h-4 w-4" />
                Check List | Comming soon...
              </h1>
            </nav>
          </div>
          {/*

              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>

              */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[5px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard/recipes">
                  <NotebookPen className="h-4 w-4" />
                  Recipes
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard/stations">
                  <CookingPot className="h-4 w-4" />
                  Stations
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" to="/dashboard/employees">
                  <User className="h-4 w-4" />
                  Employees
                </Link>

                <h1 className="flex items-center gap-3 rounded-lg  px-3 py-2  text-gray-400">
                  <ShoppingBasket className="h-4 w-4" />
                  Purchase List | Comming soon...
                </h1>

                <h1 className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all text-gray-400">
                  <TableProperties className="h-4 w-4" />
                  Check List | Comming soon...
                </h1>
              </nav>
              {/*

              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>

              */}
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
          <div className="flex flex-col items-center gap-1 text-center w-full ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
