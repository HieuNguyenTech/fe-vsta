import { Icons } from '@/components/icons';
import { getDictionary } from '@/i18n/server';
import { cn } from '@/lib/utils';
import { containerClass } from './primitives';
import { ContactForm } from './contact-form';

export async function ContactPage() {
  const { common } = await getDictionary();

  return (
    <>
      <section className='border-b border-vsta-bg-300 bg-vsta-bg-100'>
        <div className={cn(containerClass, 'py-8 lg:py-9')}>
          <div className='mb-3 flex items-center gap-2 text-sm text-vsta-fg-600'>
            <span>Trang chủ</span>
            <Icons.chevronRight className='size-3.5' />
            <span className='text-vsta-primary-700'>Liên hệ</span>
          </div>
          <div className='mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-vsta-primary-700'>
            <span className='h-0.5 w-5 bg-vsta-accent-500' />
            Liên hệ
          </div>
          <h1 className='max-w-[700px] text-3xl/[1.2] font-bold text-vsta-fg-950 lg:text-[34px]'>
            Liên hệ Hiệp hội Thương mại Giống cây trồng Việt Nam
          </h1>
          <p className='mt-3 max-w-[650px] text-sm/[1.6] text-vsta-fg-700'>
            Gửi câu hỏi, đề nghị hợp tác hoặc phản ánh tới Văn phòng Hiệp hội. Chúng tôi phản hồi
            trong 2 ngày làm việc.
          </p>
        </div>
      </section>

      <section
        className={cn(
          containerClass,
          'grid gap-6 py-10 lg:grid-cols-[349px_minmax(0,1fr)] lg:py-10'
        )}
      >
        <aside className='rounded-[6px] border border-vsta-bg-300 bg-vsta-bg-50 p-5'>
          <h2 className='mb-4 text-base font-bold text-vsta-fg-950'>Thông tin liên hệ</h2>
          <div className='divide-y divide-vsta-bg-200'>
            <ContactRow icon={Icons.mapPin} label='Địa chỉ'>
              {common.contact.address}
            </ContactRow>
            <ContactRow icon={Icons.phone} label='Điện thoại'>
              (84.4) 7345549
            </ContactRow>
            <ContactRow icon={Icons.printer} label='Fax'>
              (84.4) 7340387
            </ContactRow>
            <ContactRow icon={Icons.mail} label='Email'>
              vietnamseed@yahoo.com.vn
            </ContactRow>
            <ContactRow icon={Icons.globe} label='Website'>
              www.vietnamseed.com.vn
            </ContactRow>
          </div>
        </aside>

        <div className='rounded-[6px] border border-vsta-bg-300 bg-vsta-bg-50 p-6'>
          <h2 className='text-2xl font-bold text-vsta-fg-950'>Gửi liên hệ tới Văn phòng</h2>
          <p className='mt-3 text-xs text-vsta-fg-700'>Các trường có dấu * là bắt buộc.</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children
}: {
  icon: typeof Icons.mapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-3 py-3 text-sm text-vsta-fg-900 first:pt-0 last:pb-0'>
      <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-vsta-secondary-100 text-vsta-primary-700'>
        <Icon className='size-3.5' />
      </span>
      <div className='min-w-0'>
        <div className='text-xs text-vsta-fg-600'>{label}</div>
        <div className='mt-0.5 break-words leading-5'>{children}</div>
      </div>
    </div>
  );
}
