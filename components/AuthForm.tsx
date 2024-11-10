"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import OtpModal from "./OTPModal";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "@/lib/actions/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormTypes = "signIn" | "signUp";

const authFormSchema = (formType: FormTypes) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "signUp" ? z.string().min(2).max(50) : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormTypes }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [accountId, setAccontId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await createAccount({
        fullName: values.fullName || "",
        email: values.email,
      });

      setAccontId(user.accountId);
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "signIn" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "signUp" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your Email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button type="submit" className="form-submit-button">
            {!isLoading && (type === "signIn" ? "Sign In" : "Sign Up")}

            {isLoading && (
              <Image
                src="/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "signIn" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "signIn" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {/*OTP*/}

      {accountId && (
        <OtpModal
          email={form.getValues("email")}
          accountId={accountId as string}
        />
      )}
    </>
  );
};

export default AuthForm;
