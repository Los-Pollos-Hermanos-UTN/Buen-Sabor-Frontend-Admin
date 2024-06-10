import { AppRouter } from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/auth0/Auth0ProviderWithNavigate";

function App() {
	return (
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<AppRouter />
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	);
}

export default App;
