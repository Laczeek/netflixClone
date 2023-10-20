import { PrismaClient } from '@prisma/client';
import { getCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';

import { hashPassword } from '@/helpers/auth-helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PUT') {
		res.status(405).json({ error: { message: 'Method not allowed.' } });
	}

	const { jwt } = getCookies({ req, res });

	if (!jwt) {
		return res.status(401).json({ error: { message: 'Unautorized request' } });
	}

	const prisma = new PrismaClient();

	const { newUsername, newPassword, newPassword2 } = req.body;

	if (!newUsername && !newPassword && !newPassword2) {
		return res.status(422).json({ error: { message: 'Input / inputs not provided.' } });
	}

	let user;

	if (newUsername && !newPassword) {
		if (newUsername.trim().length < 3 || newUsername.trim().length > 15) {
			return res.status(400).json({ error: { username: 'Username must be 3 - 15 characters long.' } });
		}
		try {
			const isUsernameExists = await prisma.user.findUnique({ where: { username: newUsername } });
			if (isUsernameExists) {
				await prisma.$disconnect();
				return res.status(400).json({ error: { username: 'This username already exists in our database.' } });
			}

			const jwtData = jose.decodeJwt(jwt) as { email: string };
			user = await prisma.user.update({ where: { email: jwtData.email }, data: { username: newUsername } });
		} catch (error) {
			console.log(error);
			await prisma.$disconnect();
			return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
		}
	}

	if (!newUsername && newPassword) {
		if (newPassword.trim().length < 8) {
			return res.status(400).json({ error: { password: 'Password must have at least 8 characters.' } });
		}

		if (newPassword !== newPassword2) {
			return res.status(400).json({ error: { password2: 'Passwords must be the same.' } });
		}

		try {
			const hashedPassword = await hashPassword(newPassword);
			const jwtData = jose.decodeJwt(jwt) as { email: string };
			user = await prisma.user.update({ where: { email: jwtData.email }, data: { password: hashedPassword } });
		} catch (error) {
			console.log(error);
			await prisma.$disconnect();
			return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
		}
	}

	if (newUsername && newPassword) {
		if (newUsername.trim().length < 3 || newUsername.trim().length > 15) {
			return res.status(400).json({ error: { username: 'Username must be 3 - 15 characters long.' } });
		}

		if (newPassword.trim().length < 8) {
			return res.status(400).json({ error: { password: 'Password must have at least 8 characters.' } });
		}

		if (newPassword !== newPassword2) {
			return res.status(400).json({ error: { password2: 'Passwords must be the same.' } });
		}

		try {
			const isUsernameExists = await prisma.user.findUnique({ where: { username: newUsername } });
			if (isUsernameExists) {
				await prisma.$disconnect();
				return res.status(400).json({ error: { username: 'This username already exists in our database.' } });
			}

			const hashedPassword = await hashPassword(newPassword);
			const jwtData = jose.decodeJwt(jwt) as { email: string };

			user = await prisma.user.update({
				where: { email: jwtData.email },
				data: { password: hashedPassword, username: newUsername },
			});
		} catch (error) {
			console.log(error);
			await prisma.$disconnect();
			return res.status(500).json({ error: { message: 'Something went wrong on the server.' } });
		}
	}

	await prisma.$disconnect();

	if (user) {
		return res.json({
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				avatarName: user.avatar_name,
				queue: user.queue,
			},
		});
	}
	return res.status(500).json({ error: { message: 'Somethint went wrong on the server.' } });
};

export default handler;
