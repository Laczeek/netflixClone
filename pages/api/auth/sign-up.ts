import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

import { hashPassword } from '@/helpers/auth-helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const { email, username, password, password2 } = req.body;
	const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');

	const prisma = new PrismaClient();

	try {
		if (!email || !username || !password || !password2) {
			return res.status(422).json({ error: { message: 'One of the fields was not completed.' } });
		}

		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: { email: 'Email is incorrect.' } });
		}

		const isEmailExists = await prisma.user.findUnique({ where: { email } });
		if (isEmailExists) {
			return res.status(400).json({ error: { email: 'This email already exists in our database.' } });
		}
		if (username.trim().length < 3) {
			return res.status(400).json({ error: { username: 'Username must have at least 3 characters.' } });
		}
		if (username.trim().length > 15) {
			return res.status(400).json({ error: { username: 'Username must be less than 15 characters long.' } });
		}
		const isUsernameExists = await prisma.user.findUnique({ where: { username } });
		if (isUsernameExists) {
			return res.status(400).json({ error: { username: 'This username already exists in our database.' } });
		}
		if (password.trim().length < 8) {
			return res.status(400).json({ error: { password: 'Password must have at least 8 characters.' } });
		}

		if (password !== password2) {
			return res.status(400).json({ error: { password2: 'Passwords must be the same.' } });
		}

		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
			},
		});

		const secret = new TextEncoder().encode(process.env.SECRET);
		const alg = 'HS256';
		const jwt = await new jose.SignJWT({ email: user.email })
			.setProtectedHeader({ alg })
			.setExpirationTime('12h')
			.sign(secret);

		setCookie('jwt', jwt, { req, res, maxAge: 12 * 60 * 60 * 1000 });

		return res.json({
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				avatarName: user.avatar_name,
				queue: user.queue,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
