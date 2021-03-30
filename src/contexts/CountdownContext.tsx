import {
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
	minutes: number;
	seconds: number;
	hasFinished: boolean;
	isActive: boolean;
	startCountdown: () => void;
	resetCountdown: () => void;
}

interface CountdownProviderProps {
	children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export const CountdownProvider = ({ children }: CountdownProviderProps) => {
	let countdownTimeout: NodeJS.Timeout;

	const { startNewChallenge } = useContext(ChallengesContext);

	const initialTime = 25 * 60;
	const [time, setTime] = useState(initialTime);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

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
		setHasFinished(false);
	};

	return (
		<CountdownContext.Provider
			value={{
				minutes,
				seconds,
				hasFinished,
				isActive,
				startCountdown,
				resetCountdown,
			}}
		>
			{children}
		</CountdownContext.Provider>
	);
};
