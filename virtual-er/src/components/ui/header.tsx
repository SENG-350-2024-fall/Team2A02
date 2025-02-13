import { auth } from "@/auth";
import LoginButton from "@/components/auth/loginButton";
import LogoutButton from "@/components/auth/logoutButton";
import RoleMessage from "@/components/auth/roleMessage";
import Link from "next/link";

interface HeaderProps {
  ERName?: string;
}

const interval = setInterval(() => {
  console.log("Online");
}, 5000);

export default async function Header({ ERName }: HeaderProps) {
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => clearInterval(interval));
  }

  const session = await auth();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-xl font-bold">VirtualER {ERName}</h1>
      <div className="flex items-center space-x-2">
        <RoleMessage />
        <Link href="/login">
          {session ? <LogoutButton /> : <LoginButton />}
        </Link>
      </div>
    </div>
  );
}