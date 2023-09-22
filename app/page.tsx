/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import LoginComponents from '@/components/Login';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session, "in home");
  if (!session) {
    redirect("/login")
  }
  return (
    <div className=" flex items-center justify-center "
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <p className="text-4xl">Hello W</p>
    </div >
  )
}
