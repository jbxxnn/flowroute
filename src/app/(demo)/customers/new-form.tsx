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
import { DatePicker } from '@/components/ShadCN/DatePicker';
import { Form } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCustomerAPI } from './misc/apis';


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
  zipcode: z.string().min(2, {
    message: 'ZipCode must be at least 2 characters.',
  }),
  customer_access_key: z.string().min(2, {
    message: 'Customer Access Key must be at least 2 characters.',
  }),
  customer_secret_key: z.string().min(2, {
    message: 'Customer Secret Key must be at least 2 characters.',
  }),

  extra_field: z.string(),

  customer_billing_day: z.number({required_error:"This field is required"}),
  _customer_billing_day: z.date({required_error:"This field is required"}),
  metered_billing_plan: z.string().min(2, {
    message: 'Metered Billing Plan must be at least 2 characters.',
  }),
  metered_SIP_trunk_usage: z.string().min(2, {
    message: 'SIP Trunk usage must be at least 2 characters.',
  }),
  cloud_server_hosting_subscription: z.string().min(2, {
    message: 'Cloud Server Hosting Subscription must be at least 2 characters.',
  }),
});

interface ProfileFormProps {
  onSubmitted?: () => void;
}


export function NewForm({ onSubmitted=()=>{} }: ProfileFormProps) {

  const query_key = ['customers']
  const query_client = useQueryClient()

  const addCustomerQuery = useMutation({
    mutationFn: addCustomerAPI,
    mutationKey: query_key,
    onSuccess:()=>{
      query_client.refetchQueries({
        queryKey:query_key
      })

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
    addCustomerQuery.mutate(values)
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
              <Input {...form.register('zipcode')} />
            </label>
            {form.formState.errors.zipcode && <span className='label-error'>{form.formState.errors.zipcode.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <label>
            Customer Access Key
            <Input {...form.register('customer_access_key')} />
          </label>
          {form.formState.errors.customer_access_key && <span className='label-error'>{form.formState.errors.customer_access_key.message}</span>}
        </div>

        <div className='space-y-2'>
          <label>
            Customer Secret Key
            <Input {...form.register('customer_secret_key')} />
          </label>
          {form.formState.errors.customer_secret_key && <span className='label-error'>{form.formState.errors.customer_secret_key.message}</span>}
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
                  <DatePicker displayed_value={form.watch("customer_billing_day")} value={form.watch('_customer_billing_day')} onValueChange={val=>{form.setValue('_customer_billing_day', val); form.setValue('customer_billing_day', val.getDate())}} />
                </label>
                {form.formState.errors.customer_billing_day && <span className='label-error'>{form.formState.errors.customer_billing_day.message}</span>}
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
                  <Input {...form.register('metered_SIP_trunk_usage')} />
                  <span className="text-xs text-gray-400">
                    This is the additional charge for Metered SIP usage.
                  </span>
                </label>
                {form.formState.errors.metered_SIP_trunk_usage && <span className='label-error'>{form.formState.errors.metered_SIP_trunk_usage.message}</span>}
              </div>


              <div className='space-y-2'>
                <label>
                  Cloud Server Hosting Subscription
                  <Input {...form.register('cloud_server_hosting_subscription')} />
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
          <Button className='w-full' >
            Submit
          </Button >
        </div>
      </form>
    </Form>
  );
}
