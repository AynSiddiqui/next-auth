import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connection } from '@/db/config';
import bcrypt from 'bcrypt';
import User from '@/Models/User';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, password } = credentials as { email: string, password: string };
                try {
                    await connection();
                    const user = await User.findOne({ email });
                    console.log("in user.tsx");
                    if (!user) {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (!passwordMatch) {
                        return null;
                    }
                    console.log(user);
                    return {
                        name: user.name,
                        email: user.email,
                        id: user._id,
                    };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt(params: any) {
            // if (params.user?.role) {
            //     params.token.role = params.user.role;
            //     params.token.id = params.user.id;
            // }
            // params.token.role = "user";
            // console.log(params);
            // return final_token
            // console.log(params);
            return params.token;
        },
        async session({ session, token }) {
            // if (session.user) {
            //     (session.user as { id: string }).id = token.id as string;
            //     (session.user as { role: string }).role = token.role as string;
            // }
            // session.user = token;
            console.log("hello", session.user);
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
