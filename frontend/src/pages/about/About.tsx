export default function About() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
      <div className="grid gap-8 md:gap-12 lg:gap-16">
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Streamline Your Kitchen Operations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl lg:text-2xl">
            Elevate your culinary workflow with our comprehensive kitchen management solution. Organize your stations, manage prep lists, and track inventory effortlessly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Manage Employee Roles</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Efficiently manage your team with our employee roles feature. Assign permissions to employees to ensure they have the right level of access, whether they are viewers
              or admins.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Recipe Management</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Easily add and organize your recipes. Use our intuitive interface to input details and save your favorite recipes for quick access and efficient cooking.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Station Setup</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Customize your kitchen layout by creating and managing stations. Define areas such as Mains, Pass, or Pastry to optimize your kitchen's workflow and efficiency.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Storage Management</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Keep track of where your items are stored with our storage management tools. Organize storage places like fridges, counters, or shelves and provide detailed
              descriptions for easy access.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Units of Measurement</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Customize units of measurement to fit your kitchen’s specific needs. Whether using standard units like kilograms and liters or creating your own, we support all your
              requirements.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Prep List Items</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Organize your <i>mise en place</i> with our prep list items feature. Create detailed prep lists to ensure all elements are accounted for and streamline your daily
              preparation.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Roster Management</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Manage your kitchen roster by uploading images and displaying them in a carousel format on the dashboard. Keep track of your team and their schedules with ease.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Prep List Creation</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
              Create and manage prep lists directly from the dashboard. Use shortcuts for quick access, and enjoy features like sending lists via WhatsApp or downloading them as
              PDFs for easy distribution.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
