import { Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import TrainsPage from './pages/TrainsPage/TrainsPage.jsx';
import SeatsPage from './pages/SeatsPage/SeatsPage.jsx';
import PassengersPage from './pages/PassengersPage/PassengersPage.jsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage.jsx';
import SuccessPage from './pages/SuccessPage/SuccessPage.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/trains"
          element={<TrainsPage />}
        />

        <Route
          path="/seats"
          element={<SeatsPage />}
        />

        <Route
          path="/passengers"
          element={<PassengersPage />}
        />

        <Route
          path="/payment"
          element={<PaymentPage />}
        />

        <Route
          path="/confirmation"
          element={<ConfirmationPage />}
        />

        <Route
          path="/success"
          element={<SuccessPage />}
        />
      </Routes>
    </>
  );
}

export default App;