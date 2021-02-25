import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

export const CountDown = () => {
	const { startNewChallenge } = useContext(ChallengesContext);

	const initialTime = 0.1 * 60;
	const [time, setTime] = useState(initialTime);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	let countdownTimeout: NodeJS.Timeout;

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);
			startNewChallenge();
		}
	}, [isActive, time]);

	const startCountdown = () => {
		setIsActive(true);
	};

	const resetCountdown = () => {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setTime(initialTime);
	};

	return (
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>

			{hasFinished ? (
				<button className={styles.countdownButton} disabled>
					Ciclo encerrado
				</button>
			) : (
				<>
					{isActive ? (
						<button
							type='button'
							className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
							onClick={resetCountdown}
						>
							Abandonar ciclo
						</button>
					) : (
						<button
							type='button'
							className={styles.countdownButton}
							onClick={startCountdown}
						>
							Iniciar um ciclo
						</button>
					)}
				</>
			)}
		</div>
	);
};