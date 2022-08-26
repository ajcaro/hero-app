import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';

export const HeroPage = () => {
	const { heroId } = useParams();

	const hero = useMemo(() => getHeroById(heroId), [heroId]);
	const navigate = useNavigate();

	if (!hero) {
		return <Navigate to='/marvel' />;
	}

	const onNavigateBack = () => {
		navigate(-1);
	};

	return (
		<>
			<div className='row mt-5 animate__animated animate__fadeInLeft'>
				<div className='col-4'>
					<img
						src={`/assets/heroes/${hero.id}.jpg`}
						alt={hero.superhero}
						className='img-thumbnail'
					/>
				</div>
				<div className='col-8'>
					<h3>{hero.superhero}</h3>
					<ul className='list-group list-group-flush'>
						<li className='list-group-item'>
							<b>Alert ego: </b>
							{hero.alter_ego}
						</li>
						<li className='list-group-item'>
							<b>Publisher: </b>
							{hero.publisher}
						</li>
						<li className='list-group-item'>
							<b>First Appearance: </b>
							{hero.first_appearance}
						</li>
					</ul>

					<h5 className='mt-3'>Characters</h5>
					<p>{hero.characters}</p>

					<button onClick={onNavigateBack} className='btn btn-outline-primary'>
						Regresar
					</button>
				</div>
			</div>
		</>
	);
};
