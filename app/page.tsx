'use client';
import dynamic from 'next/dynamic';
const NodeSystem = dynamic(() => import('../components/NodeSystem'), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <NodeSystem />
    </div>
  );
}
