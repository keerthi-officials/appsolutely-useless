"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Gamepad2,
  Heart,
  Home,
  LucideProps,
  Shuffle,
  User,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface navItem {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export function Navbar() {
  const pathname = usePathname();

  const navItems: navItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/games", label: "Games", icon: Gamepad2 },
    { href: "/random", label: "Random", icon: Shuffle },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">🥔</div>
              <span className="font-bold text-xl">Appsolutely Useless</span>
            </Link>

            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t">
        <div className="safe-area-inset-bottom">
          <div className="flex items-center justify-around py-2 px-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                asChild
                className="flex-col h-auto py-2 px-2 min-w-0"
              >
                <Link
                  href={item.href}
                  className="flex flex-col items-center space-y-1"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <div className="h-16 md:block hidden" />
      <div className="h-20 md:hidden block" />
    </>
  );
}
