import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { User } from '../models/user.model';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
	currentUser: User;
}

export const Profile = ({ currentUser }: ProfileProps) => {
	const { level } = useContext(ChallengesContext);

	return (
		<div className={styles.profileContainer}>
			<img src={currentUser.avatar_url} alt='Usuário' />
			<div>
				<strong>{currentUser.name}</strong>
				<p>
					<img src='icons/level.svg' alt='level' />
					Level {level}
				</p>
			</div>
		</div>
	);
};
