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


const extra_field_options = [
  {id: "default", title: "default"},
  {id: "other", title: "other"},
] as const;

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'Phone number is required',
  }).regex(new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  ), 'Please enter a valid phone number'),
  email: z.string().min(1, {
    message: 'Email must be at least 2 characters.',
  }).email("Please input a valid email"),
  street_address: z.string().min(2, {
    message: 'Street Address must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  state: z.string().min(2, {
    message: 'State must be at least 2 characters.',
  }),
  zip_code: z.string().min(2, {
    message: 'ZipCode must be at least 2 characters.',
  }),
  access_key: z.string().min(2, {
    message: 'Customer Access Key must be at least 2 characters.',
  }),
  secret_key: z.string().min(2, {
    message: 'Customer Secret Key must be at least 2 characters.',
  }),

  extra_field: z.string(),

  billing_day: z.number({required_error:"This field is required"}),
  metered_billing_plan: z.string().min(2, {
    message: 'Metered Billing Plan must be at least 2 characters.',
  }),
  metered_sip_trunk_usage: z.number({required_error:'SIP Trunk usage is required.'}).min(1, {
    message: 'SIP Trunk usage must be at least 2 characters.',
  }),
  cloud_server_hosting_subscription: z.number({required_error: 'Cloud Server Hosting Subscription is required'}).min(1, {
    message: 'Cloud Server Hosting Subscription must be greater than 0.',
  }),
});

interface ProfileFormProps {
  onSubmitted?: () => void;
}


export function NewForm({ onSubmitted=()=>{} }: ProfileFormProps) {
  const router = useRouter()

  const query_key = ['customers']
  const query_client = useQueryClient()

  const addCustomerMutation = useMutation({
    mutationFn: addCustomerAPI,
    mutationKey: query_key,
    onSuccess:(result)=>{
      query_client.refetchQueries({
        queryKey:query_key
      })
      router.push(`/customers/${result.data.email}`)
    }
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      extra_field: 'default',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
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
                  <Select  value={String(form.watch('billing_day'))} onValueChange={value=>form.setValue("billing_day", Number(value))}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select customer billing day" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Array.from(Array(31).keys()).map((day=>(
                          <SelectItem value={String(day+1)}>{day+1}</SelectItem>
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
                  <Input {...form.register('metered_billing_plan')} />
                </label>
                {form.formState.errors.metered_billing_plan && <span className='label-error'>{form.formState.errors.metered_billing_plan.message}</span>}
              </div>

              <div className='space-y-2'>
                <label>
                  Metered SIP Trunk Usage
                  <Input {...form.register('metered_sip_trunk_usage')} type="number" onChange={e=>form.setValue("metered_sip_trunk_usage",Number(e.target.value))} />
                  <span className="text-xs text-gray-400">
                    This is the additional charge for Metered SIP usage.
                  </span>
                </label>
                {form.formState.errors.metered_sip_trunk_usage && <span className='label-error'>{form.formState.errors.metered_sip_trunk_usage.message}</span>}
              </div>


              <div className='space-y-2'>
                <label>
                  Cloud Server Hosting Subscription
                  <Input {...form.register('cloud_server_hosting_subscription')} type="number" onChange={e=>form.setValue("cloud_server_hosting_subscription",Number(e.target.value))} />
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
