import { comparePasswords } from '@/helpers/auth-helpers';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const { email, password } = req.body;
	const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');

	const prisma = new PrismaClient();

	try {
		if(!email || !password) {
			return res.status(422).json({ error: { message: 'One of the fields was not completed.' } });
		}

		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: { email: 'Email is incorrect.' } });
		}

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(400).json({ error: { email: 'The user with the specified email does not exist.' } });
		}

		const arePasswordsTheSame = await comparePasswords(password, user.password);
		if (!arePasswordsTheSame) {
			return res.status(400).json({ error: { password: 'The given password is wrong.' } });
		}

		const secret = new TextEncoder().encode(process.env.SECRET);
		const alg = 'HS256';
		const jwt = await new jose.SignJWT({ email: user.email })
			.setProtectedHeader({ alg })
			.setExpirationTime('12h')
			.sign(secret);
	
			setCookie('jwt', jwt, {req, res, maxAge: 12 * 60 * 60 * 1000})

		res.json({ user: { id: user.id, email: user.email, username: user.username, avatarName: user.avatar_name } });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
	} finally {
		await prisma.$disconnect();
	}
};

export default handler;
