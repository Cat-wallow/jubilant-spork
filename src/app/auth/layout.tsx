import { ReactNode } from 'react';
import Fonts from '../../Fonts';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Fonts />
      {children}
    </>
  );
}
