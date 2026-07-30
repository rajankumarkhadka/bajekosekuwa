'use client';

import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { contactSchema, ContactFormData } from '@/libs/schemas/contact.schema';
import Button from '../ui/button';
import { FormField } from '../forms/FormField';
import { contactService } from '@/api/services/contact.service';
import { getCsrfToken } from '@/libs/csrf';
import { useOutlet } from '@/context/OutletContext';

export default function ContactForm() {
  const csrfToken = useMemo(() => getCsrfToken(), []);
  const { selectedOutlet } = useOutlet();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      branch_id: selectedOutlet?.id || '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) =>
      contactService.sendContactMessage({
        ...data,
        branch_id: selectedOutlet?.id || data.branch_id,
      }),
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = useCallback(
    (data: ContactFormData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return (
    <>
      <div className="space-y-3 mb-8">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
          Drop us a <em className="text-[#C4010F] italic">Line</em>
        </h2>
        <p className="text-gray-500 text-sm">
          We reply within 24 hours. Fields marked <span className="text-[#C4010F]">*</span> are required.
          {selectedOutlet && (
            <span className="block mt-1 font-semibold text-gray-700">
              Inquiring about: {selectedOutlet.name} Outlet
            </span>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <div className="grid md:grid-cols-2 gap-5">
          <FormField
            placeholder="Full Name *"
            registration={register('name')}
            error={errors.name?.message}
          />
          <FormField
            type="email"
            placeholder="Email Address *"
            registration={register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FormField
            placeholder="Phone Number *"
            registration={register('phone')}
            error={errors.phone?.message}
          />
          <FormField
            placeholder="Subject *"
            registration={register('subject')}
            error={errors.subject?.message}
          />
        </div>

        <FormField
          isTextArea
          rows={6}
          placeholder="Write your message... *"
          registration={register('message')}
          error={errors.message?.message}
        />

        {mutation.isSuccess && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold animate-in fade-in duration-200">
            Message sent successfully! We will get back to you shortly.
          </div>
        )}

        {mutation.isError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold animate-in fade-in duration-200">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'Something went wrong. Please check your details and try again.'}
          </div>
        )}

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-[#C4010F] hover:bg-[#9e000b] text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50 min-w-[160px] transition-all shadow-md hover:shadow-lg"
        >
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </>
  );
}