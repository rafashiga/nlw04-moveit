import { useState } from 'react';
import { AiFillGithub, AiOutlineArrowRight } from 'react-icons/ai';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
	const [username, setUsername] = useState('');

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
					<form>
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
