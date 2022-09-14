import { heroes } from '../data/heroes';

export const getHeroesByName = (name = '') => {
	if (name?.length === 0 || name === null) return [];
	name = name.toLowerCase().trim();
	return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
};
