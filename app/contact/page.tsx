import Banner from '@/components/layout/banner';
import ContactClient from '@/components/contact/ContactClient';
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Bajeko Sekuwa',
  description: 'Get in touch with Bajeko Sekuwa for inquiries, catering, and feedback.',
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-24">
        <Banner
          subtitle="Bajeko Sekuwa"
          title={["Connect", "With Us"]}
          description="Have questions or feedback? We would love to hear from you."
          image="/images/bajelogo.png"
        />
      </div>

      <MaxWidthWrapper className="py-16 mx-auto">
        <ContactClient />
      </MaxWidthWrapper>
    </>
  );
}