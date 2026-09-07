import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser(data.email, data.password);
      navigate('/');
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold text-white">Register Now!</h1>

      {serverError && (
        <p className="mb-4 mt-4 rounded bg-red-500/20 p-2 text-sm text-red-200">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
            placeholder="create password"
            className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>}
        </div>

        <div>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="confirm password"
            className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-300">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full border border-white bg-transparent px-6 py-2 font-medium text-white hover:bg-white/10 disabled:opacity-50"
        >
          {isSubmitting ? 'Registering...' : 'register'}
        </button>
      </form>

      <Link to="/login" className="mt-6 inline-block text-m underline text-white">
        &lt; Back to login
      </Link>
    </AuthLayout>
  );
}