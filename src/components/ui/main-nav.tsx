import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/examples/dashboard", label: "Journal Papers", active: true},
  { href: "/examples/dashboard", label: "Book Chapters" },
  { href: "/examples/dashboard", label: "Conference Papers" },
  { href: "/examples/dashboard", label: "Books" },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center gap-x-4 lg:gap-x-6", className)}
      {...props}
    >
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "h6-m transition-colors hover:text-navy-blue",
            item.active ? "" : "text-stone-gray"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
