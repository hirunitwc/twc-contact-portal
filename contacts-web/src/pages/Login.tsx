import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl text-white font-bold">Hi there,</h1>
      <p className="mb-6 text-xl text-white">Welcome to our <br/>contacts portal</p>

      {serverError && (
        <p className="mb-4 rounded bg-red-500/20 p-2 text-sm text-red-200">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="e-mail"
            className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="password"
            className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
         <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full border border-white bg-transparent px-6 py-2 font-medium text-white hover:bg-white/10 disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'login'}
        </button>
          <span className="text-sm text-gray-300">or</span>
          <Link to="/register" className="text-sm text-white underline">
            Click here to Register
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}