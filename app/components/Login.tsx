'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8686/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                setError('Login failed');
            }

            const data = await response.json();

            // Store the token in localStorage or preferably in an HTTP-only cookie
            localStorage.setItem('token', data.token);

            // Redirect to dashboard or home page
            router.push('/');
        } catch (err) {
            setError('Invalid email or password');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
                <h1 className="text-2xl font-bold mb-6">Login</h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            email: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            password: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
