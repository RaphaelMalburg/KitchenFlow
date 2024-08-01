import { Link } from "react-router-dom";

// Define TriangleAlertIcon as a functional component
type TriangleAlertIconProps = {
  className: string;
};

const TriangleAlertIcon: React.FC<TriangleAlertIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export default function ErrorElement() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <TriangleAlertIcon className="text-red-500 h-12 w-12" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Oops, something went wrong!</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            An unexpected error has occurred. Please try again later or contact our support team if the issue persists.
          </p>
          <div className="flex gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
              Go to Homepage
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
