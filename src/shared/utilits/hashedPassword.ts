import bcrypt from 'bcrypt';

export function getHashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 13);
}
