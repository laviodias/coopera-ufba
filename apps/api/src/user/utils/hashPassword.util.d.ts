export function hashPassword(password: string): Promise<string>;
export function comparePassword(password: string, hash: string): Promise<boolean>; 