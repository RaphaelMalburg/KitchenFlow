import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import useEmployeStore from "@/store/useEmployeeStore";
import { createEmployeeAPI, getAllEmployeesAPI } from "@/apis/Employees";
import logo from "@/assets/kitchen-flow.png";
import { StaggeredFade } from "@/components/ui/staggered-fade";
import useAuthStore from "@/store/useAuthStore";

const Home = () => {
  const setEmployees = useEmployeStore((state) => state.setEmployees);
  const isAuthenticated = useAuthStore((state) => state.authorized);
  const fetchEmployees = async () => {
    try {
      const getEmployees = await getAllEmployeesAPI();

      if (getEmployees != undefined && getEmployees.data.length == 0) {
        await createEmployeeAPI("AdminUser", "Admin");
        fetchEmployees();
      }
      setEmployees(getEmployees?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isAuthenticated ? fetchEmployees() : "";
  }, []);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter pb-4 sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  <StaggeredFade text="Streamline Your Kitchen Operations with KitchenFlow" />
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl  dark:text-gray-400">
                  KitchenFlow is a powerful kitchen management SaaS tool that helps chefs and restaurateurs optimize their operations, increase efficiency, and reduce waste.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Boost Productivity</div>
                <div className="space-x-4">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-green-700 px-6 py-4 text-md font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    to="/register">
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    to="/about">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <img alt="Hero" className="mx-auto pb-12 overflow-hidden rounded-t-xl object-cover" height="200" src={logo} width="600" />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Kitchen Operations</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  KitchenFlow offers a suite of tools to help you manage your kitchen more efficiently, from employee roles and recipe management to station setup and prep list
                  creation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Manage Employee Roles</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Assign permissions to employees to ensure they have the right level of access, whether they are viewers or admins.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Recipe Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily add and organize your recipes. Use our intuitive interface to input details and save your favorite recipes for quick access and efficient cooking.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Station Setup</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize your kitchen layout by creating and managing stations. Define areas such as Mains, Pass, or Pastry to optimize your kitchen's workflow and efficiency.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Storage Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep track of where your items are stored with our storage management tools. Organize storage places like fridges, counters, or shelves and provide detailed
                  descriptions for easy access.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Units of Measurement</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize units of measurement to fit your kitchen’s specific needs. Whether using standard units like kilograms and liters or creating your own, we support all
                  your requirements.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Prep List Items</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organize your <i>mise en place</i> with our prep list items feature. Create detailed prep lists to ensure all elements are accounted for and streamline your daily
                  preparation.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Roster Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your kitchen roster by uploading images and displaying them in a carousel format on the dashboard. Keep track of your team and their schedules with ease.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Prep List Creation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create and manage prep lists directly from the dashboard. Use shortcuts for quick access, and enjoy features like sending lists via WhatsApp or downloading them
                  as PDFs for easy distribution.
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="#">
                Contact Sales
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="#">
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Benefits for Chefs</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Kitchen Operations</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  KitchenFlow helps chefs and restaurateurs optimize their operations, increase efficiency, and reduce waste.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Increased Efficiency</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  KitchenFlow's tools help you streamline your kitchen operations, allowing your team to work more efficiently.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Reduced Waste</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Minimize food and ingredient waste with KitchenFlow's data-driven insights and inventory tracking.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Improved Profitability</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">By optimizing your operations and reducing waste, KitchenFlow can help improve your bottom line.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Scalable Growth</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">KitchenFlow scales with your business, ensuring your kitchen can keep up with increasing demand.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Improved Team Morale</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">By streamlining your kitchen operations, KitchenFlow can help reduce stress and improve team morale.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Competitive Advantage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stay ahead of the competition by leveraging KitchenFlow's cutting-edge kitchen management tools.</p>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="#">
                Get Started
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="#">
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Trusted by Chefs</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from the chefs and restaurateurs who have transformed their kitchens with KitchenFlow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">John Doe</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Executive Chef, Michelin-starred Restaurant</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "KitchenFlow has completely transformed how we operate our kitchen. The efficiency and organization it provides are unparalleled."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Jane Smith</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sous Chef, Gourmet Bistro</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "The prep list management feature is a game-changer. We are always prepared and know exactly what needs to be done each day."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Mike Roberts</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Owner, Family Diner</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "Managing inventory has never been easier. We always know what we have in stock and when we need to reorder."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Laura Martinez</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pastry Chef, Sweet Treats Bakery</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "The station setup feature has improved our kitchen's workflow tremendously. Everything runs smoothly now."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Rajesh Kumar</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Head Chef, Indian Spice House</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "KitchenFlow's tools have helped us reduce waste significantly. We are saving money and reducing our environmental footprint."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>MM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Maria Montoya</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Catering Manager, Elegant Events</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "The real-time reporting feature is amazing. We can see exactly how our kitchen is performing at any given moment."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>DT</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">David Thompson</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Chef, Fine Dining Restaurant</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "Scalability is a huge plus for us. As we grow, KitchenFlow grows with us, making the transition seamless."
                </p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>KC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Karen Cheng</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Culinary Director, Global Cuisine</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">"KitchenFlow has revolutionized our kitchen operations. It's a must-have for any professional kitchen."</p>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                      <AvatarFallback>HB</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Hannah Brown</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Chef, Farm-to-Table Restaurant</p>
                    </div>
                  </div>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  "Our team's morale has improved significantly since we started using KitchenFlow. Everyone knows their role and tasks are clear."
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
