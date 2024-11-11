import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";

const Header = () => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form>
          <Button className="sign-out-button" type="submit">
            <Image
              src="/icons/logout.svg"
              alt="log-out"
              height={24}
              width={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
