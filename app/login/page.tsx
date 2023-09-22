
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Login from '@/components/Login';
import { getServerSession } from 'next-auth';

async function login() {
    return (
        <>
            <div>
                <Login />
            </div>
        </>
    );
}

export default login;
