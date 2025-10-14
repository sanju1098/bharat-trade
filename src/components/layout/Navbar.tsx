import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "bg-background/95 backdrop-blur-sm sticky top-0 z-30 border-b",
        className
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <h1 className="text-lg font-semibold tracking-tight lg:text-xl">
            BharatTrade
          </h1>
        </div>
      </div>
    </header>
  );
}
