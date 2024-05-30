'use client'

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from '@tanstack/react-query';
import { createNewPlanAPI } from './misc/apis';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { planFormSchema } from './misc/zod';
import { toast } from 'sonner';



export function AddForm() {
  const router = useRouter()

  const addPlanMutation = useMutation({
    mutationKey: ["plans"],
    mutationFn: createNewPlanAPI,
    onSuccess: (result)=>{
      form.reset();
      toast.success("Plan created successfully!")
      router.push(`/plans/${result.id}`)
    },
    onError: (e) => {
      toast.error("Error creating plan.")
    }
  })

  const form = useForm<z.infer<typeof planFormSchema>>({
    resolver: zodResolver(planFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof planFormSchema>) => {
    addPlanMutation.mutate(data)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

        <FormField
          control={form.control}
          name="plan_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter Plan Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="included_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Included Minutes</FormLabel>
              <FormControl>
                <Input placeholder="Enter Included Minutes" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plan_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Plan Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <label>
            Plan type
            <Select {...form.register('plan_type')} value={form.watch("plan_type")} onValueChange={val=>form.setValue("plan_type", val)}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select a plan type" />
              </SelectTrigger>
              <SelectContent className="capitalize">
                {["primary", "secondary"].map(option=>(
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          {form.formState.errors.plan_type && <span className='label-error'>{form.formState.errors.plan_type.message}</span>}
        </div>

        <FormField
          control={form.control}
          name="plan_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter plan description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button className='w-full' type="submit" busy={addPlanMutation.isPending}>Add New Plan</Button>

        {/* Submission Status Messages */}
        {addPlanMutation.isSuccess && (
          <p className="text-green-500">New Plan Added successfully!</p>
        )}
        {addPlanMutation.isError && (
          <p className="text-red-500">{addPlanMutation.error.message}</p>
        )}
      </form>
    </Form>
  );
}
