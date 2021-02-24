import styles from '../styles/components/Profile.module.css';

export const Profile = () => {
	return (
		<div className={styles.profileContainer}>
			<img src='https://github.com/diego3g.png' alt='Usuário' />
			<div>
				<strong>Nome do usuário</strong>
				<p>
					<img src='icons/level.svg' alt='level' />
					Level 1
				</p>
			</div>
		</div>
	);
};
