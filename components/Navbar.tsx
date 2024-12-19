import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2 space-y-0">
        <Image src={Logo} alt="Logo" className="size-10" />
        <p className="text-2xl font-bold">
          INVO<span className="text-blue-600">Kan</span>
        </p>
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
};
export default Navbar;
