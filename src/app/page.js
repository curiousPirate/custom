import dynamic from 'next/dynamic';

// Import your component with SSR disabled
const DynamicComponentWithNoSSR = dynamic(() => import('../app/components'), {
  ssr: false
});

export default function Page() {
  return (
    <div>
      <DynamicComponentWithNoSSR />
    </div>
  );
}