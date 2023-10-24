import { Outlet } from "react-router-dom";
import Navigation from "./components/NavBar.jsx";
import "./style/general.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </ApolloProvider>
  );
}

export default App;
