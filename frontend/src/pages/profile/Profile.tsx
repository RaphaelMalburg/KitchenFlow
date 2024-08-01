import useAuthStore from "@/store/useAuthStore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { changePasswordAPI, createBioAPI, deleteUserAPI, getBioAPI, logoutAPI } from "@/apis/User";

import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password/PasswordInput";

const formSchema = z.object({
  firstName: z.string().max(50).min(2),
  lastName: z.string().max(50).min(2),
  companyName: z.string().max(50).min(2),
});

const formSchemaPassword = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
      .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
      .regex(/(?=.*\d)/, "Password must contain at least one digit"),
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
      .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
      .regex(/(?=.*\d)/, "Password must contain at least one digit"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
export default function Profile() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const userAuthorize = useAuthStore((state) => state.authorized);
  // Initialize the form with react-hook-form and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser ? currentUser.firstName : "",
      lastName: currentUser ? currentUser.lastName : "",
      companyName: currentUser ? currentUser.companyName : "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { setAuthorized } = useAuthStore((state) => ({
    setAuthorized: state.setAuthorized,
  }));
  const formChangePassword = useForm<z.infer<typeof formSchemaPassword>>({
    resolver: zodResolver(formSchemaPassword),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange", // Validate on every change
    reValidateMode: "onChange", // Re-validate on every change
  });
  // Define the form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createBioAPI(values.firstName, values.lastName, values.companyName);
      await getBioAPI();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmitPassword = async (values: z.infer<typeof formSchemaPassword>) => {
    try {
      await changePasswordAPI(values.oldPassword, values.newPassword);
      // Redirect to desired location on success
      navigate(window.location.pathname, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteUserAPI();
    } catch (error) {
      console.error(error);
    } finally {
      setAuthorized(false);
      await logoutAPI();
      navigate("/");
    }
  };
  return (
    <main className="container mx-auto my-12 px-4 md:px-6 lg:px-8 ">
      <h1 className="mb-8 text-3xl font-bold flex justify-center">{userAuthorize ? "Account Settings" : "Create Profile"}</h1>
      <div className="grid gap-8 max-w-xl mx-auto ">
        <Tabs className="w-full" defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {userAuthorize ? <TabsTrigger value="password">Password</TabsTrigger> : ""}
          </TabsList>
          <TabsContent value="profile">
            <div className="grid gap-4">
              <h2 className="mb-2 text-xl font-semibold">{userAuthorize ? "Update" : "Create"} your profile</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className=" col-span-2">
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full col-span-2">
                    {currentUser && userAuthorize ? "Update your" : "Create an"} Profile
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <section>
              <h2 className="mb-4 text-xl font-semibold">Password</h2>
              <div className="space-y-4">
                <Form {...formChangePassword}>
                  <form onSubmit={formChangePassword.handleSubmit(onSubmitPassword)} className="space-y-8">
                    <FormField
                      control={formChangePassword.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old Password</FormLabel>
                          <FormControl>
                            <PasswordInput placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formChangePassword.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <PasswordInput placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formChangePassword.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder=""
                              {...field}
                              onChange={(e) => {
                                field.onChange(e); // Handle onChange
                                formChangePassword.trigger(["newPassword", "confirmNewPassword"]); // Trigger validation on password and confirmPassword
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="w-full" type="submit">
                      Update Password
                    </Button>
                  </form>
                </Form>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
      {currentUser && userAuthorize ? (
        <section className="mt-12 flex justify-center">
          <div className="w-full max-w-md rounded-lg border border-red-500 bg-red-50 p-6 dark:border-red-700 dark:bg-red-900/10">
            <div className="space-y-4">
              <p className="text-red-500 dark:text-red-400">Deleting your account is permanent and cannot be undone. All your data and content will be permanently deleted.</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full sm:w-auto" variant="destructive">
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button className="w-full sm:w-auto" variant="destructive" onClick={() => handleDelete()}>
                      Continue
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </main>
  );
}
