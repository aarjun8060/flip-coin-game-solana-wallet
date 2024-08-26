"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card"; // Fixed the import path

const formSchema = z.object({
  amount: z.number(),
  coin: z.enum(['Heads', 'Tails']),
});

export function InputForm({ 
    bidAmount, 
    setBidAmount, 
    coinSide, 
    setCoinSide 
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,   
      coin: ""  
    },
  });

  function onSubmit(values) {
    console.log(values);
    setBidAmount(values.amount);
    setCoinSide(values.coin);
  }

  return (
    <Form {...form} className="w-full">
      <Card className="w-full p-10">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. of Solana coin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Amount of Solana"
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Side of Coin</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Side of Coin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Heads">Heads</SelectItem>
                        <SelectItem value="Tails">Tails</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </Form>
  );
}
