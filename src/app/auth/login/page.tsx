'use client'

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginForm from "./components/form"

export default function LoginPage() {
  function handleSubmit(){

  }

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="grid place-items-center h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="hidden bg-muted lg:grid place-items-center">
        <Image
          src="/flow-bg.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
