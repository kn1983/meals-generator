"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MyCoolNavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const currentPage = usePathname();
  return (
    <Link
      href={href}
      className={`block text-center px-8 py-2 ${
        currentPage === href
          ? "bg-pink-800 hover:bg-pink-800"
          : "bg-pink-600 hover:bg-pink-500"
      }`}
    >
      {children}
    </Link>
  );
};

const MyCoolNavbar = () => {
  return (
    <nav>
      <ul className="flex gap-x-4 pb-8">
        <li>
          <MyCoolNavbarLink href="/">Home</MyCoolNavbarLink>
        </li>
        <li>
          <MyCoolNavbarLink href="/randomizeMeals">
            Randomize meals
          </MyCoolNavbarLink>
        </li>
        <li>
          <MyCoolNavbarLink href="/addMeal">Add meal</MyCoolNavbarLink>
        </li>
        <li>
          <MyCoolNavbarLink href="/meals">Meals</MyCoolNavbarLink>
        </li>
      </ul>
    </nav>
  );
};

export { MyCoolNavbar };
