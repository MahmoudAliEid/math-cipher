
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Layers, ListOrdered, Share2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { calculateCipher, CalculationResult } from "@/lib/cipher";

export default function CipherCalculator() {
    const [input, setInput] = useState("");

    const result = useMemo(() => {
        if (!input.trim()) return null;
        return calculateCipher(input);
    }, [input]);

    return (
        <div className="space-y-8 pb-20">
            {/* Hero Input Section */}
            <section className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-card/40 backdrop-blur-2xl border-primary/20 shadow-2xl overflow-hidden">
                    <CardContent className="pt-8 pb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="أدخل جملة بالحروب العربية..."
                                className="pr-12 py-8 text-xl bg-background/40 border-primary/20 focus:border-primary shadow-[0_0_15px_rgba(var(--primary),0.1)] transition-all placeholder:text-muted-foreground/50"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 hidden sm:flex">
                                    منطق التشفير v1.0
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {!result ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                    <Sparkles className="w-12 h-12 mb-4 animate-pulse text-primary" />
                    <p className="text-muted-foreground">اكتب شيئاً أعلاه لبدء العملية الحسابية...</p>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={input}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                    >
                        {/* Left Column: Tables & Steps */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Step 1 & 2 Table */}
                            <Card className="bg-card/40 backdrop-blur-md border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Hash className="w-5 h-5 text-primary" />
                                        الخطوة 1: الخرائط الأولية والقيمة
                                    </CardTitle>
                                    <CardDescription className="text-ltr">Vn = (n/10) × n</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="w-full">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-primary/10">
                                                    <TableHead className="w-16">الترتيب (n)</TableHead>
                                                    <TableHead>الحرف</TableHead>
                                                    <TableHead>التطبيع</TableHead>
                                                    <TableHead className="text-left">القيمة (Vn)</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {result.steps.map((step) => (
                                                    <TableRow key={step.index} className="border-primary/5 hover:bg-primary/5">
                                                        <TableCell className="font-mono text-muted-foreground">{step.index}</TableCell>
                                                        <TableCell className="font-bold text-lg">{step.char}</TableCell>
                                                        <TableCell><Badge variant="outline" className="text-[10px]">{step.normalizedChar}</Badge></TableCell>
                                                        <TableCell className="text-left font-semibold text-primary font-mono">{step.v1.toFixed(1)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Step 2: Grouping */}
                            <Card className="bg-card/40 backdrop-blur-md border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-primary" />
                                        الخطوة 2: تجميع الحروف المتكررة
                                    </CardTitle>
                                    <CardDescription>حساب القيمة التراكمية للمجموعة (V_group) لكل حرف فريد</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-3">
                                        {Object.entries(result.grouping).map(([char, value]) => (
                                            <div key={char} className="flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full">
                                                <span className="text-lg font-bold">{char}</span>
                                                <Separator orientation="vertical" className="h-4 bg-primary/20" />
                                                <span className="font-mono text-sm text-primary">{value.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Step 3: Multiplication */}

                            <Card className="bg-card/40 backdrop-blur-md border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-primary" />
                                        الخطوة 3: الضرب النهائي (n × V_group)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="w-full">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-primary/10">
                                                    <TableHead className="w-16">الترتيب</TableHead>
                                                    <TableHead>الحرف</TableHead>
                                                    <TableHead>مجموع المجموعة</TableHead>
                                                    <TableHead className="text-left">القيمة النهائية</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {result.steps.map((step) => (
                                                    <TableRow key={step.index} className="border-primary/5 hover:bg-primary/5">
                                                        <TableCell className="font-mono text-muted-foreground">{step.index}</TableCell>
                                                        <TableCell className="font-bold">{step.char}</TableCell>
                                                        <TableCell className="text-muted-foreground font-mono">{step.v_group.toFixed(2)}</TableCell>
                                                        <TableCell className="text-left font-bold text-primary font-mono">{step.v_final.toFixed(1)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Totals & Result */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Numerical Totals */}
                            <Card className="bg-card/40 backdrop-blur-md border-primary/10 overflow-hidden">
                                <div className="absolute top-0 left-0 p-4 opacity-10">
                                    <ListOrdered className="w-20 h-20 text-primary" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg">الإجماليات الكلية</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm text-muted-foreground italic">المجموع (الخطوة 4)</span>
                                        <span className="text-2xl font-bold tracking-tighter text-primary font-mono">
                                            {result.grandTotal.toFixed(1)}
                                        </span>
                                    </div>
                                    <Separator className="bg-primary/10" />
                                    <div className="flex justify-between items-center bg-primary/5 p-3 rounded-lg border border-primary/10">
                                        <span className="text-sm font-medium">الجزء الصحيح</span>
                                        <span className="font-mono text-lg">{Math.floor(result.grandTotal)}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* The ORB Result */}
                            <Card className="bg-card/40 backdrop-blur-xl border-primary/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                <CardHeader className="relative z-10 text-center">
                                    <CardTitle className="text-primary tracking-widest uppercase text-xs font-black">الجذر الرقمي المختزل</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10 pb-12 pt-4 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="relative"
                                    >
                                        {/* Outer Pulsing Ring */}
                                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[ping_3s_ease-in-out_infinite]" />
                                        <div className="absolute -inset-4 rounded-full border border-primary/10 animate-[pulse_2s_ease-in-out_infinite]" />

                                        {/* The Main Circle */}
                                        <div className="relative w-40 h-40 rounded-full bg-background border-4 border-primary shadow-[0_0_50px_rgba(var(--primary),0.3)] flex items-center justify-center">
                                            <span className="text-7xl font-black text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] font-mono">
                                                {result.digitalRoot}
                                            </span>
                                        </div>
                                    </motion.div>
                                    <div className="mt-8 text-center space-y-2">
                                        <Badge className="bg-primary text-primary-foreground hover:bg-primary rounded-full px-4 font-bold">النتيجة النهائية</Badge>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">اكتمال عملية اختزال الخطوة النهائية</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Share/Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="border-primary/10 bg-card/20 hover:bg-primary/10 text-xs">
                                    <Share2 className="ml-2 w-3 h-3" /> تصدير PDF
                                </Button>
                                <Button variant="outline" className="border-primary/10 bg-card/20 hover:bg-primary/10 text-xs">
                                    <div className="ml-2 w-2 h-2 rounded-full bg-green-500" /> المحرك نشط
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
