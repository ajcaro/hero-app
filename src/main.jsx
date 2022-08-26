import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css';
import { HeroApp } from './HeroApp';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<React.StrictMode>
			<HeroApp />
		</React.StrictMode>
	</BrowserRouter>
);
