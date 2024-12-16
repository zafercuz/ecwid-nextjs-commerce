import type { Metadata } from 'next';

import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const EcwidCheckout = dynamic(() => import('components/checkout/ecwid-checkout'), { ssr: false });

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  return {
    title: 'Checkout',
    description: ''
  };
}

export default function Page() {
  const store_id = process.env.ECWID_STORE_ID;
  const cartId = cookies().get('cartId')?.value;

  if (!store_id) {
    throw new Error('Missing NEXT_PUBLIC_ECWID_STORE_ID environment variable');
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col gap-8 pb-4 text-black md:pb-8 dark:text-white">
        <h1 className="mb-8 text-5xl font-bold">Checkout</h1>
        <EcwidCheckout storeId={store_id} cartId={cartId} />
      </div>
    </div>
  );
}
