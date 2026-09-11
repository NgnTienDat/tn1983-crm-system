"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const searchSchema = z.object({ keyword: z.string().trim().min(1, "Enter an order code") });
type SearchValues = z.infer<typeof searchSchema>;

export function TrackingSearch({ onSearch }: Readonly<{ onSearch: (keyword: string) => void }>) {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchValues>({ resolver: zodResolver(searchSchema) });
  return <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit(({ keyword }) => onSearch(keyword))}>
    <div className="flex-1"><input className="w-full rounded-md border border-slate-300 px-3 py-2" {...register("keyword")} placeholder="Order code" aria-label="Order code" />{errors.keyword && <p className="mt-1 text-sm text-red-600">{errors.keyword.message}</p>}</div>
    <Button type="submit">Search</Button>
  </form>;
}