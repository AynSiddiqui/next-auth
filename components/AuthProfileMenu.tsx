"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
export default function AuthProfileMenu() {
    const { data, status } = useSession();
    const isAuth = status === "authenticated";
    if (isAuth) {
        return (
            <p>
                {/* {data?.user?.name} */}
                <button onClick={() => signOut()}>Logout</button>
            </p>
        );
    }
    return (<>
        <Link href="/login">
            Login
        </Link>
    </>)
}