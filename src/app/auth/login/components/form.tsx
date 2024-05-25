import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const formSchema = z.object({
  email: z.string({required_error:"Please enter your email address to continue"}).email(),
  password: z.string({required_error:"Please enter your email address to continue"}).min(2, "Your password is invalid"),
  })

interface Props {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}


export default function LoginForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <label>
          Email
          <Input {...form.register('email')} />
        </label>
        {form.formState.errors.email && <span className='label-error'>{form.formState.errors.email.message}</span>}
      </div>
      <div className='space-y-2'>
        <label>
          Password
          <Input {...form.register('password')} type="password" />
        </label>
        {form.formState.errors.password && <span className='label-error'>{form.formState.errors.password.message}</span>}
      </div>
      <div className="">
        <Button className='w-full' >
          Login
        </Button >
      </div>
    </form>
  );
}
