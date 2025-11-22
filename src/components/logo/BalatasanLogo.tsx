
import { cn } from "@/lib/utils";

export const BalatasanLogo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center space-x-2", className)}>
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-400"
        >
            <path
                d="M4 16C4 16 8 12 16 12C24 12 28 16 28 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 20C4 20 8 16 16 16C24 16 28 20 28 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
        <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">BALATASAN</span>
            <span className="text-xs font-semibold tracking-widest text-white/70 -mt-1">BEACH RESORT</span>
        </div>
    </div>
);

    
