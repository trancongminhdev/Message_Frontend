'use client';

import Link from 'next/link';
import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import AppButton from './button/AppButton';
import AppInputFormik from './input/AppInputFormik';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 text-center">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                    Chào mừng trở lại!
                </h1>
                <p className="text-base text-gray-600">
                    Đăng nhập để tiếp tục trò chuyện với bạn bè
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-900">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <AppInputFormik
                            id="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-900">
                            Mật khẩu
                        </label>
                        <Link
                            href="#"
                            className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <AppInputFormik
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 h-11 border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 rounded border-gray-300 bg-white cursor-pointer accent-blue-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                        Nhớ mật khẩu
                    </label>
                </div>

                {/* Submit Button */}
                <AppButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors mt-2"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Đang đăng nhập...</span>
                        </div>
                    ) : (
                        'Đăng nhập'
                    )}
                </AppButton>
            </form>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">ĐĂNG NHẬP BẰNG</span>
                </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
                <button className="h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium text-gray-900">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="hidden sm:inline text-sm">Login with Google</span>
                </button>
                <button className="h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium text-gray-900">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.007 12.007 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="hidden sm:inline text-sm">Login with Facebook</span>
                </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
                Bạn chưa có tài khoản?{' '}
                <Link href="#" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors">
                    Tạo tài khoản
                </Link>
            </p>
        </div>
    );
}
