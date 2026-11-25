'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Icons } from '@/components/icons';

const inputClass =
  'h-10 w-full rounded-[6px] border border-vsta-bg-300 bg-vsta-bg-100 px-3 text-sm text-vsta-fg-900 outline-none placeholder:text-vsta-fg-600 focus:border-vsta-primary-500 focus:ring-2 focus:ring-vsta-primary-500/20';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (!result) return;

    const timeout = window.setTimeout(() => setResult(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSubmitting(true);
    setResult(null);

    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000').replace(
        /\/$/,
        ''
      );
      const response = await fetch(`${backendUrl}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Contact request failed');
      formElement.reset();
      setResult('success');
    } catch {
      setResult('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-5 grid gap-4 sm:grid-cols-2'>
      <Field label='Họ và tên *' name='name' placeholder='Nguyễn Văn A' required />
      <Field label='Email *' name='email' type='email' placeholder='email@congty.vn' required />
      <Field label='Số điện thoại' name='phone' placeholder='09xx xxx xxx' />
      <Field label='Đơn vị công tác' name='company' placeholder='Tên doanh nghiệp, tổ chức' />
      <label className='grid gap-1.5 sm:col-span-2'>
        <span className='text-xs text-vsta-fg-900'>Chủ đề *</span>
        <select name='subject' required className={inputClass} defaultValue=''>
          <option value='' disabled>
            Chọn chủ đề liên hệ
          </option>
          <option>Hợp tác</option>
          <option>Hội viên</option>
          <option>Tra cứu thông tin</option>
          <option>Khác</option>
        </select>
      </label>
      <label className='grid gap-1.5 sm:col-span-2'>
        <span className='text-xs text-vsta-fg-900'>Nội dung *</span>
        <textarea
          name='message'
          required
          placeholder='Nhập nội dung cần trao đổi...'
          className='min-h-32 w-full resize-y rounded-[6px] border border-vsta-bg-300 bg-vsta-bg-100 px-3 py-2.5 text-sm text-vsta-fg-900 outline-none placeholder:text-vsta-fg-600 focus:border-vsta-primary-500 focus:ring-2 focus:ring-vsta-primary-500/20'
        />
      </label>
      {result === 'success' && (
        <p
          role='status'
          className='animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2 rounded-[6px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 duration-500 sm:col-span-2'
        >
          <Icons.check className='size-4 shrink-0' />
          Gửi liên hệ thành công. Cảm ơn bạn!
        </p>
      )}
      {result === 'error' && (
        <p
          role='alert'
          className='animate-in fade-in slide-in-from-bottom-2 rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 duration-500 sm:col-span-2'
        >
          Không thể gửi liên hệ. Vui lòng thử lại.
        </p>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-fit rounded-[6px] bg-vsta-primary-700 px-5 py-2.5 text-sm font-semibold text-vsta-bg-50 hover:bg-vsta-primary-800 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className='grid gap-1.5'>
      <span className='text-xs text-vsta-fg-900'>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </label>
  );
}
