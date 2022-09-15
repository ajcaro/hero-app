import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/NavBar';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <NavBar  />', () => {
	const contextValue = {
		logged: true,
		user: {
			id: 'ABC',
			name: 'CaraJaula',
		},
		logout: jest.fn(),
	};

	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrar el nombre del usuario', () => {
		render(
			<MemoryRouter initialEntries={['/marvel']}>
				<AuthContext.Provider value={contextValue}>
					<Navbar />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		// screen.debug();
		expect(screen.getByText(contextValue.user.name)).toBeTruthy();
	});

	test('Debe de llamr el logout y naviate cunado se hace click en el botton logout', () => {
		render(
			<MemoryRouter initialEntries={['/marvel']}>
				<AuthContext.Provider value={contextValue}>
					<Navbar />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		const btnLogout = screen.getByRole('button');
		fireEvent.click(btnLogout);
		expect(contextValue.logout).toHaveBeenCalled();
		expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
	});
});
