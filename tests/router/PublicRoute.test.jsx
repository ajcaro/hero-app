const { render, screen } = require('@testing-library/react');
const { MemoryRouter, Route, Routes } = require('react-router-dom');
const { AuthContext } = require('../../src/auth');
const { default: PublicRoute } = require('../../src/router/PublicRoute');

describe('Pruebas en <PublicRoute />', () => {
	test('Debe de mostrar el children si no está autenticado', () => {
		const contextValue = { logged: false };

		render(
			<AuthContext.Provider value={contextValue}>
				<PublicRoute>
					<h1>Ruta Publica</h1>
				</PublicRoute>
			</AuthContext.Provider>
		);

		expect(screen.getByText('Ruta Publica')).toBeTruthy();
	});

	test('Debe de Navegar si esta autenticado', () => {
		const contextValue = { logged: true, user: { id: 'ABC', name: 'Carlos' } };

		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/login']}>
					<Routes>
						<Route
							path='login'
							element={
								<PublicRoute>
									<h1>Ruta Publica</h1>
								</PublicRoute>
							}
						></Route>
						<Route path='marvel' element={<h1>Pagina de marvel</h1>}></Route>
					</Routes>
				</MemoryRouter>
			</AuthContext.Provider>
		);

		expect(screen.getByText('Pagina de marvel')).toBeTruthy();
		screen.debug();
	});
});
