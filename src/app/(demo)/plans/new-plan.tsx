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
  const [submissionStatus, setSubmissionStatus] = useState<
    null | "success" | "error" | string
  >(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_name: '',
      included_minutes: '',
      plan_price: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/add-plan", { // Updated API endpoint
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        form.reset();
      } else {
        setSubmissionStatus("error");

        if (responseData.errors) {
          // Handle Zod validation errors returned by API
          for (const error of responseData.errors) {
            form.setError(error.path[0], { type: "manual", message: error.message });
          }
        } else if (responseData.message) {
          // Handle specific error messages from the API
          switch (responseData.message) {
            case "An item with this ID already exists.":
              form.setError("plan_name", {
                type: "manual",
                message: responseData.message,
              });
              break;
            default:
              // Generic error handling
              setSubmissionStatus(responseData.message);
          }
        } else {
          // Handle unexpected API errors
          console.error("Unexpected error:", responseData);
          setSubmissionStatus("An unexpected error occurred.");
        }
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error submitting form:", error);
    }
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

        <Button className='w-full' type="submit">Add New Plan</Button>

        {/* Submission Status Messages */}
        {submissionStatus === "success" && (
          <p className="text-green-500">New Plan Added successfully!</p>
        )}
        {submissionStatus === "error" && (
          <p className="text-red-500">Error Adding New Plan. Please try again.</p>
        )}
      </form>
    </Form>
  );
}
