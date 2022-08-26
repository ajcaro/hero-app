import { heroes } from '../';

export const getHeroesByPublisher = (publisher) => {
	const validPublishers = ['DC Comics', 'Marvel Comics'];

	if (!validPublishers.includes(publisher)) {
		throw new error(`${publisher} is not a valid publisher`);
	}

	return heroes.filter((hero) => hero.publisher === publisher);
};
