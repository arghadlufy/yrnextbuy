"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SortingControls() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const createSortUrl = (sortValue: string | null): string => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return `${pathname}${queryString}`;
  };

  return (
    <>
      <h3 className="text-sm font-medium">Sort by</h3>
      <Link href={createSortUrl(null)}>
        <Button
          variant="outline"
          size="sm"
          className={cn(currentSort === null && "bg-primary text-primary")}
        >
          <ArrowUpDownIcon className="w-4 h-4" />
          Newest
        </Button>
      </Link>
      <Link href={createSortUrl("price-asc")}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            currentSort === "price-asc" && "bg-primary text-primary"
          )}
        >
          <ArrowUpDownIcon className="w-4 h-4" />
          Low to high
        </Button>
      </Link>
      <Link href={createSortUrl("price-desc")}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            currentSort === "price-desc" && "bg-primary text-primary"
          )}
        >
          <ArrowUpDownIcon className="w-4 h-4" />
          High to low
        </Button>
      </Link>
    </>
  );
}
