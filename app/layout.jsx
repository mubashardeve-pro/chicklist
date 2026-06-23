import './globals.css';

export const metadata = {
  title: 'Documents Checklist – Edify Group',
  description: 'Edify Group documents checklist form with PDF download and sharing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
