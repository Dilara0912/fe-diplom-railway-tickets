
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout({ children, pageClass = '' }) {
  return (
    <div className={`page ${pageClass}`}>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
