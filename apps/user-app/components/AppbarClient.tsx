"use client"
import React from 'react'

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Appbar from '@repo/ui/appbar';

const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();
  return (
    <div className='border-b border-slate-300'><Appbar onSignIn={signIn} onSignOut={async ()=> {
        await signOut();
        router.push("api/auth/signin");
    }} user={session.data?.user}/></div>
  )
}

export default AppbarClient;