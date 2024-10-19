'use client';

import dynamic from 'next/dynamic'

const JogoDaForcaUnicornio = dynamic(() => import('./JogoDaForcaUnicornio'), { ssr: false })

export default function Home() {
  return <JogoDaForcaUnicornio />;
}