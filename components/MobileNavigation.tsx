"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems } from "@/constants";
import { Button } from "./ui/button";
import FileUploader from "./header/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

type MobileNavigationProps = {
  $id: string;
  accountId: string;
  email: string;
  fullName: string;
  avatar: string;
};
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  $id: ownerId,
  accountId,
  email,
  fullName,
  avatar,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <div className="flex items-center gap-1">
        <Image
          src="/icons/logo-brand.svg"
          alt="logo"
          height={52}
          width={52}
          className="h-auto"
        />

        <span className="text-2xl font-semibold text-brand/85">cloudVault</span>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="h-fit p-1.5">
          <Image src="icons/menu.svg" alt="svg" height={30} width={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div>
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">
                  {email.charAt(0).toUpperCase() + email.slice(1)}
                </p>
              </div>
            </div>

            <Separator className="mb-4 bg-light-200/30" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active",
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="mb-4 bg-light-200/30" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader accountId={accountId} ownerId={ownerId} />
            <Button
              className="mobile-sign-out-button"
              type="submit"
              onClick={async () => {
                await signOutUser();
              }}
            >
              <Image
                src="/icons/logout.svg"
                alt="log-out"
                height={24}
                width={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
