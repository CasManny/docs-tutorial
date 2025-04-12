"use client";

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { FullscreenLoader } from "./fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex justify-center items-center min-h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="Auth Loading..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
