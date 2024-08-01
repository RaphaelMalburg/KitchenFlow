import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Link, useNavigate } from "react-router-dom";
import { getBioAPI, loginAPI } from "@/apis/User";
import { PasswordInput } from "../password/PasswordInput";
import { UserDTO } from "@/models/User";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one digit"),
  rememberme: z.boolean().default(false).optional(),
});

export function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const navigate = useNavigate();
  const { setUserAsync, setAuthorized, setToken } = useAuthStore((state) => ({
    setUserAsync: state.setUserAsync,
    setAuthorized: state.setAuthorized,
    setToken: state.setToken,
  }));

  // Initialize the form with react-hook-form and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberme: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Define the form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const loginData: UserDTO = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      // Call loginAPI to authenticate the user
      const loginResponse = await loginAPI(loginData);

      // Check if loginResponse and its data exist and set the token
      const token = loginResponse?.data.token;
      if (token) {
        setToken(token);
      } else {
        console.error("Token is missing from the login response.");
      }

      // Check if login is successful
      if (loginResponse) {
        const bioResponse = await getBioAPI();

        // Check if bioResponse exists and set user data
        if (bioResponse) {
          await setUserAsync(bioResponse.data); // Assuming bioResponse.data contains the UserBioDTO
        } else {
          console.error("Bio data is missing from the API response.");
        }
        setAuthorized(true);
        onLoginSuccess();
        navigate("/");
      } else {
        console.error("Login failed:", loginResponse);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleClose = () => {
    onLoginSuccess();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="submit">Log in</Button>

            <div className="flex gap-x-6 items-center">
              <Link to="/" className="text-sm font-medium hover:underline underline-offset-4 ">
                Forgot password?
              </Link>
              <Button variant={"secondary"} type="button">
                <Link to="/register" onClick={() => handleClose()} className="text-sm font-medium hover:underline underline-offset-4">
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
