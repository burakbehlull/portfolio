import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
