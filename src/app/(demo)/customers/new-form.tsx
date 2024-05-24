import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

interface ProfileFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div>
        <label>Username</label>
        <input {...form.register('username')} />
        {form.formState.errors.username && <span>{form.formState.errors.username.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
