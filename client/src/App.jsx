import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Header';
import Footer from './components/Footer';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

function useBodyClass(className) {
  useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}

function App() {
  useBodyClass('bg-white');

  const location = useLocation();

  // Create an instance of Apollo Client with createHttpLink
  const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && <Nav />}
        <Outlet />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
