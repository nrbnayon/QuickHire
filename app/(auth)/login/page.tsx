import { SignInForm } from "@/components/Auth/SignInForm";

export const metadata = {
  title: `Login | ${process.env.NEXT_PUBLIC_APP_NAME} `,
  description: `Secure login for ${process.env.NEXT_PUBLIC_APP_NAME} users.`,
};

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
