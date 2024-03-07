import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { GithubIcon } from "lucide-react";

const spaceMono = Space_Mono({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export function Nav() {
  return (
    <div className="h-14 py-2 px-2 md:px-8 border-b flex items-center">
      <div className="flex flex-1 items-center">
        <Link href="/">
          <h1
            className={cn("font-light text-sm md:text-lg", spaceMono.className)}
          >
            <span className="text-pink-700">upscaler</span>
            <span className="mx-1">🎉</span>
            <span>party</span>
          </h1>
        </Link>
      </div>
      <div className="flex flex-none items-center space-x-4">
        <ThemeToggle />
        <Link
          href="https://github.com/fal-ai/upscaler-battleground-demo-app"
          className="flex flex-row space-x-2 items-center"
          target="_blank"
        >
          <GithubIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
