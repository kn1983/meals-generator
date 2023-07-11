import Link from "next/link";

const MyCoolNavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="block text-center px-8 py-2 bg-blue-800 hover:bg-blue-900"
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
