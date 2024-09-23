import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            id: string;
            role: string;
        };
    }

    interface User {
        id: string;
        role: string;
    }
}


declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: string;
    }
}