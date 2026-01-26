
import CipherCalculator from "@/components/CipherCalculator";
import { ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">نظام <span className="text-primary">التشفير</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors border-r border-white/10 pr-4">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">تسجيل الخروج</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl">
                        اكتشف <span className="text-primary italic">هندسة</span> الأرقام.
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-[600px] text-lg">
                        نظام التشفير يستخدم رسم خرائط الحروف المتقدم بناءً على الموقع للكشف عن الأنماط العددية المخفية في أي جملة.
                    </p>
                </div>

                <CipherCalculator />
            </div>

            <footer className="border-t border-white/5 py-8 opacity-40">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xs text-ltr">© 2026 Cipher System Core Engineering. Designed for Scientific Discovery.</p>
                </div>
            </footer>
        </main>
    );
}
