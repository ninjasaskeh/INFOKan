import React from "react";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import HeroIMG from "@/public/hero.png";
import BackgroundGradient from "@/components/BackgroundGradient";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 py-2 px-4 rounded-full">
          Introducing INVOKan 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
          Invoicing Made
          <span className="block mt-1 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
            Super Easy!
          </span>
        </h1>
        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Creating can be a pain! We at INVOKan can make it super easy for you
          to get the paid ontime!
        </p>
        <div className="mt-8 mb-12">
          <Link href="/login">
            <RainbowButton>Get Unlimited Access</RainbowButton>
          </Link>
        </div>
      </div>

      <div className="relative items-center w-full py-12 mx-auto mt-12">
        <BackgroundGradient />
        <Image
          src={HeroIMG}
          alt="Hero"
          className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
};
export default Hero;
