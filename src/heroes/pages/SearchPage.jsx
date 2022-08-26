import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';

export const SearchPage = () => {
	const navigate = useNavigate();

	const location = useLocation();
	//const { q = '' } = queryString.parse(location.search);

	const [searchParams, setSearchParams] = useSearchParams();
	const q = searchParams.get('q');

	const { searchText, onInputChange, onResetForm } = useForm({
		searchText: '',
	});

	const onSearch = (evt) => {
		evt.preventDefault();
		if (searchText.trim().length <= 1) return;

		navigate(`?q=${searchText}`);
	};

	return (
		<>
			<h1>Search</h1>
			<hr />

			<div className='row'>
				<div className='col-5'>
					<h4>Searching</h4>
					<hr />
					<form onSubmit={onSearch}>
						<input
							type='text'
							placeholder='Search a hero'
							className='form-control'
							name='searchText'
							autoComplete='off'
							onChange={onInputChange}
						/>

						<button className='btn btn-outline-primary mt-1'>Search</button>
					</form>
				</div>
				<div className='col-7'>
					<h4>Results</h4>
					<hr />

					<div className='alert alert-primary'>Search a hero</div>
					<div className='alert alert-danger'>
						No hero with <b>{q}</b>
					</div>

					{/* <HeroCard /> */}
				</div>
			</div>
		</>
	);
};