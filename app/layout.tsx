import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'EcoMeasure',
  description: 'Environmental measurement solutions',
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
