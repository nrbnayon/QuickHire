"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";

export function LandingView() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Your App";
  const { isAuthenticated, role } = useUser();

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-muted/20 to-background flex flex-col justify-center">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center md:py-24">
        <span className="rounded-full border bg-background px-4 py-1 text-sm text-muted-foreground">
          Welcome to {appName}
        </span>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Manage your business operations from one clean dashboard
        </h1>

        <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          Access products, users, payments, orders, and notifications with a
          fast and modern workflow.
        </p>

        {!isAuthenticated ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 shadow-sm hover:shadow-md transition-all">
              <Link href="/signin">User Signin</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 shadow-sm hover:bg-muted/50 hover:text-primary transition-all">
              <Link href="/signin/admin">Admin Signin</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-full px-8 shadow-sm hover:shadow-md transition-all">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in duration-1000">
             <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
               <Link href={role === 'admin' ? '/admin' : '/profile'}>
                 Go to {role === 'admin' ? 'Admin Dashboard' : 'Profile Settings'}
               </Link>
             </Button>
          </div>
        )}
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Centralized Management</CardTitle>
            <CardDescription>
              Keep everything in one place without switching tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Manage users, products, and orders from a single interface designed
            for speed.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Visibility</CardTitle>
            <CardDescription>Track key workflows and status updates in real time.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Review commission and payment data with a structured, consistent
            experience.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Secure Access</CardTitle>
            <CardDescription>Sign in and continue exactly where you left off.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Authentication and route protection keep your data safer and access
            controlled.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
