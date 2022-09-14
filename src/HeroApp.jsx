import AuthProvider from './auth/context/AuthProvider';
import { AppRouter } from './router/AppRouter';

export const HeroApp = () => {
	return (
		<>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</>
	);
};
