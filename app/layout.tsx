import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'Marvilon',
  description: 'Environmental measurement solutions',
  icons: {
    icon: '/svg/marvilon_logo.svg',
    apple: '/svg/marvilon_logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* Could be server component since no toggle needed */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
