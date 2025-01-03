import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from './providers';
import NavBarLayout from './layouts/navBarLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ padding: 0, margin: 0 }}>
        <ReactQueryProvider>
          <NavBarLayout>{children}</NavBarLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
