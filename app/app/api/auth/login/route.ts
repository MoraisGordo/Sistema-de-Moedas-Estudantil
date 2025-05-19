import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // In a real app, you would hash the password and compare with the stored hash
    // For demo purposes, we're doing a simple check
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // In a real app, you would use bcrypt.compare or similar
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      );
    }

    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}