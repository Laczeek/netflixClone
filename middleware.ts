import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export const middleware = async (req: NextRequest) => {
	const { pathname } = req.nextUrl;
	const jwt = req.cookies.get('jwt')?.value;

	if (pathname.startsWith('/api/user') || pathname === '/api/seed') {
		if (!jwt) {
			return NextResponse.json({ error: { message: 'Unauthorized request.' } }, { status: 401 });
		}

		const secret = new TextEncoder().encode(process.env.SECRET);

		try {
			await jose.jwtVerify(jwt, secret);
		} catch (error) {
			return NextResponse.json({ error: { message: 'Unauthorized request.' } }, { status: 401 });
		}
	}

	if (!pathname.startsWith('/api')) {
		if (!jwt) {
			return NextResponse.redirect(new URL('/auth', req.url));
		}

		const secret = new TextEncoder().encode(process.env.SECRET);

		try {
			await jose.jwtVerify(jwt, secret);
		} catch (error) {
			return NextResponse.redirect(new URL('/auth', req.url));
		}
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/((?!_next/static|_next/image|auth|favicon.ico).*)'],
};
