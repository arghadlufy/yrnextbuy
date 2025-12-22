import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    href: "/category/electronics",
  },
  {
    id: 2,
    name: "Clothing",
    href: "/category/clothing",
  },
  {
    id: 3,
    name: "Home",
    href: "/category/home",
  },
];

export function Navbar() {
  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold">
            YrNextBuy
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="text-sm font-medium hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/search">
              <SearchIcon className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/cart">
              <ShoppingCartIcon className="size-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
