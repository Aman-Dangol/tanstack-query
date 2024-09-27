import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Com from "./Com";

const client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <h1>tanstack query</h1>
        <Com />
      </QueryClientProvider>
    </>
  );
}

export default App;
