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
import { useFetchPlansQuery } from '../plans/misc/queries';
import { customerFormSchema } from './misc/zod';
import { toast } from 'sonner';
import { PLAN_TYPES } from '@/lib/constants';
import { PlanTypes } from '@/lib/types/plans';


interface ProfileFormProps {
  onSubmitted?: () => void;
}

type PlanSelectProps = {
  label:string;
  field:string;
  type:PlanTypes;
  form: any
}

export function PlanSelect({label, form, field, type}:PlanSelectProps){
  const {data:plans, isLoading, isError, error} = useFetchPlansQuery()
  return (
    <div className='space-y-2'>
      <label>
        {label}
        <Select {...form.register(field)} name={label} value={form.watch(field)} onValueChange={val=>form.setValue(field, val)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <p>Loading plans...</p>
            ): isError ? (
                <p className='text-red-500 text-sm'>Error loading plans</p>
              ): 
                plans?.filter(plan=>plan.plan_type===type).map(option=>(
                  <SelectItem key={option.id} value={String(option.id)}>{option.plan_name}</SelectItem>
                ))
            }
          </SelectContent>
        </Select>
      </label>
      {form.formState.errors?.[field] && <span className='label-error'>{form.formState.errors?.[field].message}</span>}
    </div>
  )
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
      router.push(`/customers/${result.data.customer_id}`)
      toast.success("Customer created successfully!")
    },
    onError: ()=>{
      toast.error("Error creating customer")
    }

  })
  
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullname: '',
      subscription_type: PLAN_TYPES[0],
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
            Subscription Type
            <Select {...form.register('subscription_type')} value={form.watch("subscription_type")} onValueChange={val=>form.setValue("subscription_type", val)}>
              <SelectTrigger className="capitalize" >
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
              <SelectContent className="capitalize">
                {PLAN_TYPES.map(option=>(
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          {form.formState.errors.subscription_type && <span className='label-error'>{form.formState.errors.subscription_type.message}</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {form.watch('subscription_type') === "secondary" ? (
            <>

              <PlanSelect form={form} label="Metered Billing Plan" field="metered_billing_plan" type={form.watch("subscription_type")} />

              <div className='space-y-2'>
                <label>
                  Cloud Server Hosting Subscription
                  <Input {...form.register('cloud_server_hosting_subscription')} type="number"  />
                </label>
                {form.formState.errors.cloud_server_hosting_subscription && <span className='label-error'>{form.formState.errors.cloud_server_hosting_subscription.message}</span>}
              </div>

              <div className='space-y-2 md:col-span-2'>
                <label>
                  Metered SIP Trunk Usage
                  <Input {...form.register('metered_sip_trunk_usage')} type="number" />
                  <span className="text-xs text-gray-400">
                    This is the additional charge for Metered SIP usage.
                  </span>
                </label>
                {form.formState.errors.metered_sip_trunk_usage && <span className='label-error'>{form.formState.errors.metered_sip_trunk_usage.message}</span>}
              </div>
            </>

          ): (
              <>
                <div className="md:col-span-2">
                  <PlanSelect form={form} label="Phone Plan" field="phone_plan" type={form.watch("subscription_type")} />
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
