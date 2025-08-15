"use client";

import React, { useMemo, useState } from "react";
import {
  ShoppingBag,
  Instagram,
  Search,
  Filter,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// ###############################
// Hora de Vestirse — Single-file React page
// - Sin fotos por ahora (placeholders gráficos)
// - Buscador, filtros, ordenamiento
// - Carrito simulado (sin pagos aún)
// - Hecho para Next.js (App Router) + Tailwind + shadcn/ui
// ###############################

const CATEGORIES = ["Buzos", "Sweaters", "Camperas", "Accesorios"] as const;

const SAMPLE_PRODUCTS = [
  { id: "p1", name: "Buzo oversize — Sanrio", price: 28999, category: "Buzos", licensed: true, brand: "Sanrio", color: "Violeta", sizes: ["S","M","L","XL"] },
  { id: "p2", name: "Sweater básico unisex", price: 25999, category: "Sweaters", licensed: false, brand: "HDV", color: "Gris", sizes: ["S","M","L","XL"] },
  { id: "p3", name: "Campera liviana", price: 39999, category: "Camperas", licensed: false, brand: "HDV", color: "Negra", sizes: ["S","M","L","XL"] },
  { id: "p4", name: "Buzo con capucha — Sanrio", price: 31999, category: "Buzos", licensed: true, brand: "Sanrio", color: "Rosa", sizes: ["S","M","L","XL"] },
  { id: "p5", name: "Sweater texturado", price: 27999, category: "Sweaters", licensed: false, brand: "HDV", color: "Crema", sizes: ["S","M","L","XL"] },
  { id: "p6", name: "Campera rompeviento", price: 42999, category: "Camperas", licensed: false, brand: "HDV", color: "Celeste", sizes: ["S","M","L","XL"] },
  { id: "p7", name: "Gorro tejido", price: 9999, category: "Accesorios", licensed: false, brand: "HDV", color: "Azul", sizes: ["Único"] },
  { id: "p8", name: "Buzo crop — edición", price: 29999, category: "Buzos", licensed: false, brand: "HDV", color: "Verde", sizes: ["S","M","L"] },
] as const;

type Category = typeof CATEGORIES[number];
type Product = (typeof SAMPLE_PRODUCTS)[number];

function pesos(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h;
}

function PlaceholderArt({ seed }: { seed: string }) {
  const hue = useMemo(() => Math.abs(hash(seed)) % 360, [seed]);
  const bg = `hsl(${hue} 70% 96%)`;
  const dot = `hsl(${(hue + 40) % 360} 70% 45%)`;
  const bar = `hsl(${(hue + 320) % 360} 70% 55%)`;
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border" style={{ background: bg }}>
      <div className="absolute inset-0 grid grid-cols-6 opacity-50">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border-b border-r" />
        ))}
      </div>
      <div className="absolute -bottom-6 -right-10 h-40 w-40 rounded-full" style={{ background: dot }} />
      <div className="absolute top-6 left-6 h-4 w-24 rounded-full" style={{ background: bar }} />
      <div className="absolute top-12 left-6 h-3 w-12 rounded-full" style={{ background: bar, opacity: 0.8 }} />
      <div className="absolute bottom-6 left-6 h-2 w-16 rounded-full" style={{ background: bar, opacity: 0.6 }} />
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-full text-left">
              <PlaceholderArt seed={p.id + p.name} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {p.name}
                {p.licensed && (
                  <Badge className="gap-1" variant="secondary">
                    <ShieldCheck className="h-3 w-3" /> Con licencia
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{pesos(p.price)}</div>
                <Badge variant="outline">{p.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Vista previa sin fotos. Muy pronto cargamos las imágenes y stock en tiempo real.
              </p>
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">Talles:</span>
                {p.sizes.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button disabled className="w-full">
                  Agregar al carrito (próximamente)
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                ¿Te interesa? Escribinos por Instagram y te reservamos.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardHeader className="p-4">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="line-clamp-1">{p.name}</span>
          {p.licensed && (
            <Badge className="ml-2" variant="secondary">
              Licencia
            </Badge>
          )}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {p.brand} · {p.color}
        </div>
        <div className="font-semibold">{pesos(p.price)}</div>
        <div className="pt-2">
          <Button variant="secondary" className="w-full" onClick={() => setOpen(true)}>
            Ver detalles
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function HoraDeVestirse() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | "Todos">("Todos");
  const [sort, setSort] = useState<"destacados" | "precio-asc" | "precio-desc">("destacados");

  const filtered = useMemo(() => {
    let list = SAMPLE_PRODUCTS.filter((p) => (active === "Todos" ? true : p.category === active));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => `${p.name} ${p.brand} ${p.category} ${p.color}`.toLowerCase().includes(q));
    }
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, active, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 border">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-lg">Hora de vestirse</div>
              <div className="text-xs text-muted-foreground">Streetwear · Licencias oficiales</div>
            </div>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2">
            <div className="relative w-80">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar: buzos, sanrio, campera…" className="pl-8" />
            </div>
            <a href="https://www.instagram.com/horadevestirse.ar" target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2">
                <Instagram className="h-4 w-4" /> Instagram
              </Button>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2">
                  <ShoppingBag className="h-4 w-4" /> Carrito
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Tu carrito</SheetTitle>
                </SheetHeader>
                <div className="py-6 text-sm text-muted-foreground">Aún no activamos el carrito. Muy pronto vas a poder comprar desde acá 💜</div>
                <Separator />
                <div className="pt-4">
                  <a href="https://www.instagram.com/horadevestirse.ar" target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 underline">
                    Reservá por Instagram <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Llega <span className="text-violet-600">Hora de vestirse</span>
            </h1>
            <p className="mt-3 text-slate-600 max-w-prose">
              Catálogo online de buzos, sweaters, camperas y más. Algunas piezas con <strong>licencia oficial</strong> (ej: Sanrio) y otras de producción propia.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="#catalogo">
                <Button className="gap-2">Ver catálogo</Button>
              </a>
              <a href="https://www.instagram.com/horadevestirse.ar" target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2">
                  <Instagram className="h-4 w-4" /> Seguinos
                </Button>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Badge variant="secondary" className="gap-1">
                <BadgeCheck className="h-3 w-3" /> Licencia Sanrio
              </Badge>
              <span>·</span>
              <span>Hecho en Argentina</span>
            </div>
          </div>
          <div className="rounded-3xl border p-6 bg-white/60">
            <div className="aspect-[5/3] rounded-2xl border bg-gradient-to-br from-violet-50 to-indigo-50 grid place-items-center">
              <div className="text-center p-6">
                <div className="font-bold">Sin fotos por ahora</div>
                <div className="text-sm text-muted-foreground">Usamos placeholders; cuando quieras subimos imágenes reales y stock.</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">*Esta interfaz es 100% funcional para buscar y filtrar. Carrito/pagos próximamente.</div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section id="catalogo" className="max-w-6xl mx-auto px-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Button variant={active === "Todos" ? "default" : "outline"} onClick={() => setActive("Todos")}>
            <Filter className="h-4 w-4 mr-2" />
            Todos
          </Button>
          {CATEGORIES.map((cat) => (
            <Button key={cat} variant={active === cat ? "default" : "outline"} onClick={() => setActive(cat)}>
              {cat}
            </Button>
          ))}
          <div className="ml-auto">
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>
        <Separator />
      </section>

      {/* Grid de productos */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-sm text-muted-foreground">No encontramos resultados con esos filtros.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold">Hora de vestirse</div>
            <div className="text-muted-foreground">Catálogo de indumentaria · Buenos Aires, AR</div>
          </div>
          <div>
            <div className="font-semibold">Contacto</div>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>
                <a className="underline" href="https://www.instagram.com/horadevestirse.ar" target="_blank" rel="noreferrer">
                  Instagram @horadevestirse.ar
                </a>
              </li>
              <li>
                <span>WhatsApp: </span>
                <a className="underline" href="#" title="Reemplazá con tu link wa.me">
                  (agregar link)
                </a>
              </li>
              <li>
                Email:{" "}
                <a className="underline" href="#">
                  (agregar)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Licencias</div>
            <p className="mt-2 text-muted-foreground">
              Trabajamos con licencias oficiales seleccionadas (p.ej., Sanrio) y líneas de producción propia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: "destacados" | "precio-asc" | "precio-desc";
  onChange: (v: "destacados" | "precio-asc" | "precio-desc") => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setOpen((v) => !v)} className="gap-2">
        <ChevronDown className="h-4 w-4" /> Ordenar
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow">
          <button className={itemCls(value === "destacados")} onClick={() => { onChange("destacados"); setOpen(false); }}>
            Destacados
          </button>
          <button className={itemCls(value === "precio-asc")} onClick={() => { onChange("precio-asc"); setOpen(false); }}>
            Precio: menor a mayor
          </button>
          <button className={itemCls(value === "precio-desc")} onClick={() => { onChange("precio-desc"); setOpen(false); }}>
            Precio: mayor a menor
          </button>
        </div>
      )}
    </div>
  );
}

function itemCls(active: boolean) {
  return `w-full text-left px-3 py-2 text-sm ${active ? "bg-violet-50" : "hover:bg-slate-50"}`;
}
