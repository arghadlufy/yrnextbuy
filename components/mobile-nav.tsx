import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { categories } from "./navbar";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">YrNextBuy</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2">
          <SheetClose asChild>
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
          </SheetClose>
          {categories.map((category) => (
            <SheetClose asChild key={category.id}>
              <Link
                href={category.href}
                className="text-sm font-medium hover:text-primary"
              >
                {category.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
