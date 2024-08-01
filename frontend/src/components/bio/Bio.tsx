import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { createBioAPI, getBioAPI } from "@/apis/User";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useAuthStore from "@/store/useAuthStore";

// Define the Zod schema for UserBioDTO
const formSchema = z.object({
  firstName: z.string().max(50).min(2),
  lastName: z.string().max(50).min(2),
  companyName: z.string().max(50).min(2),
});

export function RegisterBio() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const userAuthorize = useAuthStore((state) => state.authorized);
  // Initialize the form with react-hook-form and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser && userAuthorize ? currentUser.firstName : "",
      lastName: currentUser && userAuthorize ? currentUser.lastName : "",
      companyName: currentUser && userAuthorize ? currentUser.companyName : "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
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

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{currentUser && userAuthorize ? "Update" : "Create"} your profile</CardTitle>
        <CardDescription>Enter your information to {currentUser && userAuthorize ? "update" : "create"} an account profile</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <h2 className="mb-4 text-xl font-semibold">Profile</h2>
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
      </CardContent>
    </Card>
  );
}
