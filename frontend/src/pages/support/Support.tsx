import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UserContactEmailDTO } from "@/models/User";
import { sendEmailContacts } from "@/apis/User";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Name must be at least 2 characters").max(30, "Name must be maximum 30 characters"),
  message: z.string().min(2, "Name must be at least 2 characters").max(350, "Name must be maximum 350 characters"),
});

export default function Support() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const email: UserContactEmailDTO = {
        name: values.name,
        email: values.email,
        message: values.message,
      };
      await sendEmailContacts(email);
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Support</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Get the help you need to make the most of our kitchen management tool. Fill out the form below or check our FAQs for common questions.
          </p>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQs</h2>
            <div className="space-y-2">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  How are employee roles managed?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  To manage employee roles, log in and navigate to the sidebar on the dashboard. Click on the "Employees" button, then add an employee and assign a type of
                  permission. "Viewers" can only view data, while "Admins" have full access and can modify or add data.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  How do I add a new recipe?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  To add a new recipe, go to the recipes tab on the dashboard and click the "Add Recipe" button. Fill in the recipe details and click "Save" to add it to your
                  collection.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  What is a station and how do I create one?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  A station is a specific section in your kitchen, such as Mains, Pass, or Pastry. To create a station, navigate to the stations tab and add a new station.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  What is a storage place?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  A storage place refers to where items are typically stored, such as specific fridges, counters, or shelves. Use the description field to provide more details
                  about the storage location.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  What is a unit of measurement?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  A unit of measurement can be a standard unit such as kilograms or liters. You can also customize units to suit your kitchen's needs, like packages of 6 units or
                  specific containers.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  What is a prep list item?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  A prep list item is an element of your <i>mise en place</i> list. After adding all the necessary elements, create a prep list item that will be used daily to
                  generate the prep lists.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  How do I add a roster?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  To add a roster, go to the main section of the dashboard and upload the roster images. You can add multiple images, and they will be displayed in a carousel
                  format.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  How do I create a prep list?
                  <ChevronDownIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  To create a prep list, click on the stations tab and select "Create Prep List." You can also use the shortcut displayed on the dashboard with the station name.
                  After creating the prep list, you can save it and choose to send it via WhatsApp or download it as a PDF.
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
