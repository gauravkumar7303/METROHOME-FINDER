// Path: app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import User from '@/src/lib/User.model';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/register called');

  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Connect DB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered. Please login.' },
        { status: 409 }
      );
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Registration successful for:', email);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('💥 Register API error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}