import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { role, email, password, ...rest } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    // In a real app, you would hash the password before storing
    const user = await prisma.user.create({
      data: {
        email,
        password, // In production, this should be hashed
        role,
        ...rest,
      },
    });

    // Create balance record for student or teacher
    if (role === "STUDENT") {
      await prisma.studentCoinBalance.create({
        data: {
          studentId: user.id,
          balance: 0,
        },
      });
    } else if (role === "TEACHER") {
      await prisma.teacherCoinBalance.create({
        data: {
          teacherId: user.id,
          balance: 1000,
        },
      });
    }

    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}