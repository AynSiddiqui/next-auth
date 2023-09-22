"use client"
import axios from "axios"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { stat } from "fs"
import toast from "react-hot-toast"
import { sleep } from "openai/core.mjs"
// import { error } from "console"
const Login = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    if (session) {
        router.replace("/");
    }
    const [error, setError] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();
        if (!email || !password) {
            return setError("Please fill all the fields");
        }
        toast.loading('Logging in...');
        //set interval of 15 seconds
        // Handle form submission logic here
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            // callbackUrl: "/",
        });
        if (res?.error) {
            toast.dismiss();
            toast.error(res.error);
            return;
        }
        router.replace("/");
        toast.dismiss();
        toast.success('Logged in successfully!');
    }

    return (
        <>
            {!session &&
                < section
                    className="h-screen flex md:space-y-0 md:space-x-16 justify-center items-center mx-5 md:mx-0 md:my-0"
                    style={{ height: "calc(100vh - 4rem)" }}>
                    <form
                        onSubmit={handleSubmit}
                        className="border-2 p-6 border-black max-w-sm shadow-slate-600 rounded-xl shadow-lg">
                        <h1 className="text-2xl font-semibold text-center justify-center items-center mb-4">Login</h1>
                        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        <div className="text-center ">
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
                        </div>
                        <div className="my-4 font-semibold text-sm text-slate-500 text-center">
                            Don&apos;t have an account? <a className="text-blue-800 hover:underline hover:underline-offset-4" href="#">Register</a>

                        </div>
                    </form>
                </section >}
        </>


    )
}

export default Login