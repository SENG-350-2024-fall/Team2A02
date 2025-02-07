'use client'

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitLoginForm } from '@/lib/server-actions';
import { credentialsSchema } from "@/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
    const [loginError, setLoginError] = useState<string | null>(null)
    const [loggingIn, setLoggingIn] = useState<boolean>(false)

    function handleSubmit(data: z.infer<typeof credentialsSchema>) {
        setLoggingIn(true)

        submitLoginForm(data)
            .then(result => {
                if (result?.error) {
                    setLoggingIn(false)
                    setLoginError(result.error)
                }
            })
    }

    const form = useForm<z.infer<typeof credentialsSchema>>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const emailField = <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                        type="email"
                        placeholder="email@example.com"
                        required
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    const passwordField = <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input
                        type="password"
                        placeholder=""
                        required
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="m-auto space-y-3">
                {emailField}
                {passwordField}
                <div className="flex justify-between">
                    <Button type="submit">Login</Button>
                    <Link href="/register">
                        <Button type="button" className="ml-2">Register</Button>
                    </Link>
                </div>
                {loginError && <p className="text-red-500">{loginError}</p>}
                {loggingIn && <p>Logging in...</p>}
            </form>
        </Form>
    )
}