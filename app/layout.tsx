import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'EcoMeasure',
  description: 'Environmental measurement solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Inline script to set theme before render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.className = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />  {/* Could be server component since no toggle needed */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
