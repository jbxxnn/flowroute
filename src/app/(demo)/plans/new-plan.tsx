'use client'

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
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


const formSchema = z.object({
  plan_name: z.string().min(2, {
    message: 'Plan name must be at least 2 characters.',
  }),
  included_minutes: z.string().min(2, {
    message: 'Included minutes must be a number.',
  }),
  plan_price: z.string().min(2, {
    message: 'Plan Price must be a number.',
  }),

});



export function AddForm() {
  const router = useRouter()

  const addPlanMutation = useMutation({
    mutationKey: ["plans"],
    mutationFn: createNewPlanAPI,
    onSuccess: (result)=>{
      form.reset();
      router.push(`/plans/${result.id}`)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_name: '',
      included_minutes: '',
      plan_price: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
                <Input type="text" placeholder="Enter Included Minutes" {...field} />
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
                <Input type="text" placeholder="Enter Plan Price" {...field} />
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
