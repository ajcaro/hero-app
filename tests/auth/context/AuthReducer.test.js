import { useContext } from 'react';
import { authReducer } from '../../../src/auth/context/AuthReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en AuthReducer', () => {
	const initialState = {
		logged: false,
	};
	const user = {
		id: 'ABC',
		name: 'Antonio J Caro',
	};
	test('Debe de regresar el estado por defecto', () => {
		const action = {
			type: '',
		};

		const state = authReducer(initialState, action);
		expect(state.logged).toBeFalsy();
	});

	test('Debe de (login) llamar el login autentiicar y establecer el user', () => {
		const action = {
			type: types.login,
			payload: user,
		};
		const state = authReducer(initialState, action);
		expect(state.logged).toBeTruthy();
		expect(state.user).toEqual(user);
	});

	test('Debe de (logout) borrar el name del usuario y establecer el loffed en false', () => {
		const action = {
			type: types.logout,
		};

		const initState = {
			logged: true,
			user: { id: 'ABC', name: 'Pedro' },
		};

		const state = authReducer(initState, action);
		//expect(state.logged).toBeFalsy();
		expect(state).toEqual({ logged: false });
	});
});
