import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, name, email, password } = await req.json();
    console.log({ username, email, password });

    // Check if the user already exists
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (exists) {
      console.log('User already exists');
      return NextResponse.json({ error: 'User already exists' }, { status: 409 }); // 409 Conflict
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newuser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashpassword,
        name,
      },
    });

    console.log('User Registered', newuser);
    return NextResponse.json({ message: 'User Registered' }, { status: 201 });
    
  } catch (error) {
    console.error('Error while registering', error);
    return NextResponse.json({ error: 'Error while registering user' }, { status: 500 });
  }
}
