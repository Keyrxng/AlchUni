import styles from "../../styles/Panel.module.css";
import { Button, TextArea } from '@web3uikit/core';

export const Panel = () => {
	return (
		<div className={styles.panel_container}>
			<div className={styles.panel}>
				<div className={styles.box}>
					<h2>Short</h2>
					<p>
						A <small>little</small> tip goes a long way...
					</p>
					<input placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
						<Button theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
				</div>
				<div className={styles.box}>
					<h2>Tall</h2>
					<p>
						The bigger they are, the more they're <big>tall</big>...
					</p>
					<input placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
					<Button theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
				</div>
			</div>
			<div className={styles.panel}>
				<div className={styles.box}>
					<h2>Grande</h2>
					<p>
						Your making a grand difference...
					</p>
					<input placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
					<Button theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
				</div>
				<div className={styles.box}>
					<h2>Trenta</h2>
					<p>
						Low on wit, require caffeine immediately
					</p>
					<input placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
					<Button theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
