import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { AiFillGithub, AiOutlineArrowRight } from 'react-icons/ai';
import api from '../services/api';

import styles from '../styles/pages/Login.module.css';

interface LoginProps {
	currentUser: any;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export default function Login() {
	const [username, setUsername] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await api.get(`/users/${username}`);
		if (response.status === 200) {
			Cookies.set('currentUser', JSON.stringify(response.data));
		}
	};

	return (
		<div className={styles.login}>
			<div className={styles.loginContainer}>
				<section>
					<img src='/logo-full.svg' alt='move.it' />
					<h1>Bem-vindo</h1>
					<div className={styles.loginDescription}>
						<AiFillGithub className={styles.icon} />
						<p>Faça login com seu Github para começar</p>
					</div>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Digite seu username'
							onChange={(event) => setUsername(event.target.value)}
						/>
						<button type='submit' disabled={!username}>
							<AiOutlineArrowRight />
						</button>
					</form>
				</section>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { currentUser } = context.req.cookies;

	if (currentUser) {
		context.res.writeHead(302, {
			Location: '/',
		});
		context.res.end();
	}

	return {
		props: {},
	};
};
