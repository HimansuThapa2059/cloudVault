"use client";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  fullName: string;
  avatar: string;
  email: string;
};

const Sidebar: React.FC<SidebarProps> = ({ fullName, avatar, email }) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <div className="hidden items-center lg:flex">
          <Image
            src="/icons/logo-brand.svg"
            alt="logo"
            height={62}
            width={62}
            className="h-auto"
          />

          <span className="ml-2 text-2xl font-semibold text-brand/85">
            cloudVault
          </span>
        </div>
        <Image
          src="/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatarPlaceholderUrl}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">
            {email.charAt(0).toUpperCase() + email.slice(1)}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
