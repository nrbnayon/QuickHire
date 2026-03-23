import { SignInForm } from "@/components/Auth/SignInForm";

export const metadata = {
  title: `Admin Login | ${process.env.NEXT_PUBLIC_APP_NAME} `,
  description: `Secure login for ${process.env.NEXT_PUBLIC_APP_NAME} administrators.`,
};

export default function AdminLoginPage() {
  return (
    <SignInForm isAdmin={true} />
  );
}
