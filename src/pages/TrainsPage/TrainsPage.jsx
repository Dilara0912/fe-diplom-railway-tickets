import Layout from '../../components/Layout/Layout';
import SearchForm from '../../components/SearchForm/SearchForm';
import Hero from '../../components/Hero/Hero';
import BookingSteps from '../../components/BookingSteps/BookingSteps';
import FiltersSidebar from '../../components/FiltersSidebar/FiltersSidebar';
import LastTickets from '../../components/LastTickets/LastTickets';
import SearchResultsHeader from '../../components/SearchResultsHeader/SearchResultsHeader';
import TrainsList from '../../components/TrainsList/TrainsList';
import Pagination from '../../components/Pagination/Pagination';

import './TrainsPage.css';

function TrainsPage() {
  return (
    <Layout pageClass="page--trains">
      <div className="trains-page__banner">
        <div className="trains-page__search">
          <SearchForm />
        </div>
      </div>

      <BookingSteps currentStep={1} />

      <div className="trains-page">
        <aside className="trains-page__sidebar">
          <FiltersSidebar />
          <LastTickets />
        </aside>

        <section className="trains-page__content">
          <SearchResultsHeader />
          <TrainsList />
          <Pagination />
        </section>
      </div>
    </Layout>
  );
}

export default TrainsPage;
