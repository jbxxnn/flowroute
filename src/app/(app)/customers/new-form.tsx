"use client"

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
import { Form } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCustomerAPI } from './misc/apis';
import { useRouter } from 'next/navigation';
import { fetchPlansQuery } from '../plans/misc/queries';
import { customerFormSchema } from './misc/zod';


const extra_field_options = [
  {id: "default", title: "default"},
  {id: "other", title: "other"},
] as const;


interface ProfileFormProps {
  onSubmitted?: () => void;
}


export function NewForm({ onSubmitted=()=>{} }: ProfileFormProps) {
  const router = useRouter()

  const {data:plans, isLoading, isError, error} = fetchPlansQuery()

  const query_key = ['customers']
  const query_client = useQueryClient()

  const addCustomerMutation = useMutation({
    mutationFn: addCustomerAPI,
    mutationKey: query_key,
    onSuccess:(result)=>{
      query_client.refetchQueries({
        queryKey:query_key
      })
      router.push(`/customers/${result.data.customer_id}`)
    }
  })
  
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullname: '',
      extra_field: 'default',
    },
  });

  function handleSubmit(values: z.infer<typeof customerFormSchema>) {
    addCustomerMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>

        <div className='space-y-2'>
          <label>
            Fullname
            <Input {...form.register('fullname')} />
          </label>
          {form.formState.errors.fullname && <span className='label-error'>{form.formState.errors.fullname.message}</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className='space-y-2'>
            <label>
              Phone
              <Input {...form.register('phone')} />
            </label>
            {form.formState.errors.phone && <span className='label-error'>{form.formState.errors.phone.message}</span>}
          </div>

          <div className='space-y-2'>
            <label>
              Email
              <Input {...form.register('email')} />
            </label>
            {form.formState.errors.email && <span className='label-error'>{form.formState.errors.email.message}</span>}
          </div>

          <div className='space-y-2'>
            <label>
              Street Address
              <Input {...form.register('street_address')} />
            </label>
            {form.formState.errors.street_address && <span className='label-error'>{form.formState.errors.street_address.message}</span>}
          </div>

          <div className='space-y-2'>
            <label>
              City
              <Input {...form.register('city')} />
            </label>
            {form.formState.errors.city && <span className='label-error'>{form.formState.errors.city.message}</span>}
          </div>

          <div className='space-y-2'>
            <label>
              State
              <Input {...form.register('state')} />
            </label>
            {form.formState.errors.state && <span className='label-error'>{form.formState.errors.state.message}</span>}
          </div>

          <div className='space-y-2'>
            <label>
              Zipcode
              <Input {...form.register('zip_code')} />
            </label>
            {form.formState.errors.zip_code && <span className='label-error'>{form.formState.errors.zip_code.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <label>
            Customer Access Key
            <Input {...form.register('access_key')} />
          </label>
          {form.formState.errors.access_key && <span className='label-error'>{form.formState.errors.access_key.message}</span>}
        </div>

        <div className='space-y-2'>
          <label>
            Customer Secret Key
            <Input {...form.register('secret_key')} />
          </label>
          {form.formState.errors.secret_key && <span className='label-error'>{form.formState.errors.secret_key.message}</span>}
        </div>

        <div className='space-y-2'>
          <label>
            Extra Field
            <Select {...form.register('extra_field')} value={form.watch("extra_field")} onValueChange={val=>form.setValue("extra_field", val)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
              <SelectContent>
                {extra_field_options.map(option=>(
                  <SelectItem key={option.id} value={option.id}>{option.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          {form.formState.errors.extra_field && <span className='label-error'>{form.formState.errors.extra_field.message}</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {form.watch('extra_field') === "default" ? (
            <>
              <div className='space-y-2'>
                <label>
                  Customer Billing Day
                  <Select {...form.register('billing_day')} value={String(form.watch('billing_day'))} onValueChange={value=>form.setValue("billing_day", Number(value))}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select customer billing day" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Array.from(Array(31).keys()).map((day=>(
                          <SelectItem key={day} value={String(day+1)}>{day+1}</SelectItem>
                        )))
                      }
                    </SelectContent>
                  </Select>
                  
                </label>
                {form.formState.errors.billing_day && <span className='label-error'>{form.formState.errors.billing_day.message}</span>}
              </div>

              <div className='space-y-2'>
                <label>
                  Metered Billing Plan
                  <Select {...form.register('metered_billing_plan')} name="metered billing plan" value={form.watch("metered_billing_plan")} onValueChange={val=>form.setValue("metered_billing_plan", val)}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <p>Loading plans...</p>
                      ): isError ? (
                          <p className='text-red-500 text-sm'>Error loading plans</p>
                        ): 
                          plans?.map(option=>(
                            <SelectItem key={option.id} value={String(option.id)}>{option.plan_name}</SelectItem>
                          ))
                      }
                    </SelectContent>
                  </Select>
                </label>
                {form.formState.errors.metered_billing_plan && <span className='label-error'>{form.formState.errors.metered_billing_plan.message}</span>}
              </div>

              <div className='space-y-2'>
                <label>
                  Metered SIP Trunk Usage
                  <Input {...form.register('metered_sip_trunk_usage')} type="number" />
                  <span className="text-xs text-gray-400">
                    This is the additional charge for Metered SIP usage.
                  </span>
                </label>
                {form.formState.errors.metered_sip_trunk_usage && <span className='label-error'>{form.formState.errors.metered_sip_trunk_usage.message}</span>}
              </div>


              <div className='space-y-2'>
                <label>
                  Cloud Server Hosting Subscription
                  <Input {...form.register('cloud_server_hosting_subscription')} type="number"  />
                </label>
                {form.formState.errors.cloud_server_hosting_subscription && <span className='label-error'>{form.formState.errors.cloud_server_hosting_subscription.message}</span>}
              </div>
            </>

          ): (
              <>
                <div className='space-y-2'>
                  <label>
                    Extra 1
                    <Input {...form.register('phone')} />
                  </label>
                  {form.formState.errors.phone && <span className='label-error'>{form.formState.errors.phone.message}</span>}
                </div>

                <div className='space-y-2'>
                  <label>
                    Extra 2
                    <Input {...form.register('phone')} />
                  </label>
                  {form.formState.errors.phone && <span className='label-error'>{form.formState.errors.phone.message}</span>}
                </div>
              </>
            )}
        </div>

        <div className="">
          <Button className='w-full' busy={addCustomerMutation.isPending} >
            Submit
          </Button >

          {addCustomerMutation.isSuccess && (
            <p className="text-green-500">New Customer Added successfully!</p>
          )}
          {addCustomerMutation.isError && (
            <p className="text-red-500">{addCustomerMutation.error.message}</p>
          )}
        </div>
      </form>
    </Form>
  );
}
