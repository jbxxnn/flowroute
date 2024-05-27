"use client"; // Required for client-side interaction with forms in Next.js 13+

import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// Zod schema for form validation (now allows string IDs)
const formSchema = z.object({
  id: z.string().min(1, { message: "ID must be at least 1 character long" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export function UpdateItemForm() {
  const [submissionStatus, setSubmissionStatus] = useState<
    null | "success" | "error" | string
  >(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/add-user", { // Updated API endpoint
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
              form.setError("id", {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Field for ID (type="text" for string input) */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter user ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Field for Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter user name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>

        {/* Submission Status Messages */}
        {submissionStatus === "success" && (
          <p className="text-green-500">Form submitted successfully!</p>
        )}
        {submissionStatus === "error" && (
          <p className="text-red-500">Error submitting form. Please try again.</p>
        )}
      </form>
    </Form>
  );
}
