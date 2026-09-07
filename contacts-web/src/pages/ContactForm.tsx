import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { contactSchema, type ContactFormData } from '../schemas/contact.schema';
import AppLayout from '../components/AppLayout';
import { api } from '../lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function ContactForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // present only on /contacts/edit/:id
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Fetch existing contact data when editing
  const { data: existingContact } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      const res = await api.get(`/contacts/${id}`);
      return res.data;
    },
    enabled: isEditMode,
  });

  useEffect(() => {
    if (existingContact) {
      reset(existingContact);
    }
  }, [existingContact, reset]);

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (isEditMode) {
        return api.put(`/contacts/${id}`, data);
      }
      return api.post('/contacts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate('/contacts');
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <AppLayout>
      <div className="mt-16 max-w-2xl">
        <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Contact' : 'New Contact'}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                {...register('name')}
                placeholder="full name"
                className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>}
            </div>

            <div className="flex-1">
              <input
                {...register('email')}
                placeholder="e-mail"
                className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-1">
              <input
                {...register('phone')}
                placeholder="phone number"
                className="w-full rounded-full border-none bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span>gender</span>
              <label className="flex items-center gap-1">
                <input type="radio" value="male" {...register('gender')} /> male
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="female" {...register('gender')} /> female
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 rounded-full bg-white px-6 py-2 font-medium text-twc-teal hover:bg-gray-100 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'save changes' : 'add your first contact'}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}