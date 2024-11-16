import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="hidden items-center lg:flex">
            <Image
              src="/icons/logo-brand-2.svg"
              alt="logo"
              height={80}
              width={80}
              className="h-auto"
            />

            <span className="h1 ml-2 font-semibold text-white">cloudVault</span>
          </div>

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is a place where you can store all your documents.
            </p>
          </div>
          <Image
            src="/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <div className="flex items-center">
            <Image
              src="/icons/logo-brand.svg"
              alt="logo"
              height={74}
              width={74}
              className="h-auto"
            />

            <span className="ml-2 text-3xl font-semibold text-brand">
              cloudVault
            </span>
          </div>
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;
