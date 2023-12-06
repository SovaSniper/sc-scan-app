"use client";

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/main/mode-toggle";
import { useRouter } from "next/navigation";
import { ChainInfo } from "@/components/main/chain-info";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <main className="">
      <div className="flex items-center justify-between space-x-4 px-8 py-3 border-b">
        <div className="font-bold cursor-pointer hover:text-primary" onClick={() => router.push("/")}>SC-Scan</div>
        <div className="space-x-2">
          <ModeToggle />
        </div>
      </div>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 min-h-screen">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
            Decoding Smart Contracts for Enhanced Blockchain Safety
          </h1>
          <p className="leading-normal text-muted-foreground sm:text-xl sm:leading-8">See it in action by going to the app!</p>
          <div className="space-x-4">
            <Button className="h-11 px-8" onClick={() => router.push("/app")}>Goto App</Button>
            <Button asChild variant="outline" className="h-11 px-8">
              <Link href="https://devpost.com/software/sc-scan" target="_blank">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <h2 className="my-4 font-heading font-bold text-center text-3xl leading-[1.1] sm:text-3xl md:text-4xl">Available Chains</h2>
      <div className="container grid grid-cols-12 gap-4">
        {['1', '5', '11155111', '137', '80001', '43114', '43113'].map((network) => {
          return (
            <div key={network} className="col-span-12 lg:col-span-4">
              <ChainInfo network={network} />
            </div>
          )
        })}
      </div>
    </main>
  );
}
