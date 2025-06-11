import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utilies";
const SubmitButton = ({
  lable,
  link,
  className,
}: {
  lable: string;
  link: string;
  className?: string;
}) => (
  <Link
    className={cn(
      "w-2/3 mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md",
      className
    )}
    to={link}
  >
    {lable}
  </Link>
);

export default SubmitButton;
