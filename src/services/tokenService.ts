import prisma from "../prisma";

export async function invalidateToken(token: string, expiresIn: string) {
  const expiresAt = new Date(Date.now() + Number(expiresIn) * 1000); // expiresIn tính bằng giây
  await prisma.invalidatedToken.create({
    data: {
      token,
      expiresAt,
    },
  });
}

export async function isTokenInvalidated(token: string): Promise<boolean> {
  const invalidated = await prisma.invalidatedToken.findUnique({
    where: { token },
  });

  return !!invalidated; // True nếu token đã bị vô hiệu hóa
}
