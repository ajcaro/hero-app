import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

describe('Pruebas en <SearchPage  />', () => {
	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrarse correctamente con valores por defecto', () => {
		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);

		expect(container).toMatchSnapshot();
	});

	test('Debe de mostrar a batman y el input con el valor del queryString', () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/search?q=batman']}>
				<SearchPage />
			</MemoryRouter>
		);

		// screen.debug();
		const input = screen.getByRole('textbox');
		expect(input.value).toBe('batman');

		const img = screen.getByRole('img');
		expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

		const alertDanger = screen.getByLabelText('alert-danger');
		expect(alertDanger.style.display).toBe('none');
	});

	test('Debe de mostrar un error si no se encuentra el  heroe (batman123)', () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/search?q=batman123']}>
				<SearchPage />
			</MemoryRouter>
		);

		const alertDanger = screen.getByLabelText('alert-danger');
		expect(alertDanger.style.display).toBe('');
	});

	test('Debe de llamar el navigate a la pantalla nueva', () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/search']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, {
			target: { name: 'searchText', value: 'superman' },
		});

		const form = screen.getByRole('form');
		fireEvent.submit(form);

		expect(mockNavigate).toHaveBeenCalledWith('?q=superman');
		//screen.debug();
	});
});
