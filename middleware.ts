import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const middleware = async (req: NextRequest) => {
    const {pathname} = req.nextUrl;
    if (pathname.startsWith("/_next")) return NextResponse.next();


    if(pathname !== '/auth' && pathname !== '/api/auth/sign-up' && pathname !== '/api/auth/sign-in') {
        const jwt = req.cookies.get('jwt');
        if(!jwt) {
           return NextResponse.redirect(new URL('/auth', req.url))
        }
        
        try {
            const secret = new TextEncoder().encode(process.env.SECRET);
            await jose.jwtVerify(jwt.value, secret)
        }
        catch(error) {
            return NextResponse.redirect(new URL('/auth', req.url))
    }
    }

    return NextResponse.next();
};



export default middleware;
