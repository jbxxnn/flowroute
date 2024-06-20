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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewPlanAPI } from './misc/apis';
import { Textarea } from '@/components/ui/textarea';
import { planFormSchema } from './misc/zod';
import { toast } from 'sonner';
import { PLAN_TYPES } from '@/lib/constants';


type Props = {
  onSuccess : ()=>void
}

export function AddForm({onSuccess}:Props) {
  const query_client = useQueryClient()

  const addPlanMutation = useMutation({
    mutationKey: ["plans"],
    mutationFn: createNewPlanAPI,
    onSuccess: (result)=>{
      form.reset();
      query_client.refetchQueries({
        queryKey:["plans"]
      })
      toast.success("Plan created successfully!")
      onSuccess()
    },
    onError: (e) => {
      toast.error("Error creating plan.")
    }
  })

  const form = useForm<z.infer<typeof planFormSchema>>({
    resolver: zodResolver(planFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof planFormSchema>) => {
    const preparedData = {
      ...data,
      included_minutes: data.included_minutes ?? "",
      additional_minutes: data.additional_minutes ?? "",
      included_numbers: data.included_numbers ?? "",
      number_cost: data.number_cost ?? "",
      included_channels: data.included_channels ?? "",
      cost_additional_channels: data.cost_additional_channels ?? "",
    };
    addPlanMutation.mutate(preparedData)
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

        <div className='space-y-2'>
          <label>
            Plan type
            <Select {...form.register('plan_type')} value={form.watch("plan_type")} onValueChange={val=>form.setValue("plan_type", val)}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select a plan type" />
              </SelectTrigger>
              <SelectContent className="capitalize">
                {PLAN_TYPES.map(option=>(
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          {form.formState.errors.plan_type && <span className='label-error'>{form.formState.errors.plan_type.message}</span>}
        </div>



        {form.watch('plan_type') === "metered" || form.watch('plan_type') === "unmetered" ? (
        <>
        {form.watch('plan_type') === "metered" && (
          <>
        <FormField
          control={form.control}
          name="additional_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Minutes</FormLabel>
              <FormControl>
                <Input placeholder="Enter Additional Minutes" {...field} type="number" />
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
      </>
      )}
      {form.watch('plan_type') === "unmetered" && (
        <>
         <FormField
          control={form.control}
          name="included_channels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Included Channels</FormLabel>
              <FormControl>
                <Input placeholder="Enter Included Channels" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost_additional_channels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost of Additional Channels</FormLabel>
              <FormControl>
                <Input placeholder="Enter cost of additional Channels" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </>
          )}
          <FormField
          control={form.control}
          name="included_numbers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Included Numbers</FormLabel>
              <FormControl>
                <Input placeholder="Enter Included Numbers" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
      control={form.control}
      name="number_cost"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cost of Extra Number</FormLabel>
          <FormControl>
            <Input placeholder="Enter Cost of Extra Number" {...field} type="number" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
            </>
) : (
  <>
  </>
)}


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
