import { Outlet } from "react-router-dom";
import Navigation from "./components/NavBar";
import "./style/general.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </ApolloProvider>
  );
}


