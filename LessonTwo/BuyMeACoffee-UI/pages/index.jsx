import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Panel } from "./components/panels";
import { Section } from "./layout/section";
import abi from './utils/BuyMeACoffee.json'
import { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { Button, TextArea } from '@web3uikit/core';

export default function Home() {
	const contractAddr = "0x56Dc1491c7691F13B60521fEa02559749F18dEC9";
	const contractAbi = abi.abi;

	const [currentAccount, setCurrentAcc] = useState("");
	const [name, setName] = useState("");
	const [msg, setMsg] = useState("");
	const [memos, setMemos] = useState([0]);
		
		const onNameChange = (e) => {
			setName(e.target.value);
		}
		const onMsgChange = (e) => {
			setMsg(e.target.value);
		}

		const isWalletConnected = async () => {
			try {
				const {ethereum} = window;
				const accounts = await ethereum.request({method: 'eth_accounts'})
				console.log('accounts: ', accounts);

				if (accounts.length > 0) {
					const accounts = accounts
					console.log('wallet is connected! ' + accounts);
				} else {
					console.log("no wallet connected");
				}
			} catch (error) {
				console.log("error: ", error)
			}
		}

		const buyCoffee = async () => {
			try {
				const {ethereum} = window;

				if (ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum, "any");
					const signer = provider.getSigner();
					const buyMeACoffee = new ethers.Contract(
						contractAddr,
						contractAbi,
						signer
					);
					
					console.log("buying coffee...")
					const coffeeTx = await buyMeACoffee.buyCoffee(
						name ? name : "anon",
						msg ? msg : "Enjoy your coffee!",
						{value: ethers.utils.parseEther("0.001")}
					);

					await coffeeTx.wait();

					console.log("mined: ", coffeeTx.hash);
					console.log("coffee purchased!");
					setName("");
					setMsg("");
				}
			} catch (error) {
				console.log(error)
			}
		}

		const getMemos = async () => {
			try {
				const {ethereum} = window;
				if(ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum);
					const signer = provider.getSigner();
					const buyMeACoffee = new ethers.Contract(
						contractAddr,
						contractAbi,
						signer
					);
					console.log("fetching memos from the blockchain...")
					const memos = await buyMeACoffee.getMemos();
					console.log("fetched!");
					setMemos(memos);
				} else {
					console.log("Metamask is not connected");
				}
			} catch (error) {
				console.log(error)
			}
		}

		useEffect(() => {
			let buyMeACoffee;
			isWalletConnected();
			getMemos();

			const onNewMemo = (from, timestamp, name, message) => {
				console.log("Memo received: ", from, timestamp, name, message);
				setMemos((prevState) => [
					...prevState,
					{
						address: from,
						timestamp: new Date(timestamp * 1000),
						message,
						name
					}
				])
			}


const {ethereum} = window;

if (ethereum) {
	const provider = new ethers.providers.Web3Provider(ethereum, "any");
	const signer = provider.getSigner();
	buyMeACoffee = new ethers.Contract(
		contractAddr,
		contractAbi,
		signer
	)
	buyMeACoffee.on("NewMemo", onNewMemo)
}

return () => {
	if (buyMeACoffee) {
		buyMeACoffee.off("NewMemo", onNewMemo);
	}
}
},[]);

	return (
		<div>
			<header className={styles.header_container}>
				<div className={styles.navbar}>
					<ConnectButton></ConnectButton>
				</div>
				<div className={styles.logo_container}>
					<h1 className={styles.logo}>☕</h1>
					<h1>Buy Keyrxng A Coffee</h1>
				</div>
			</header>
			<main className={styles.main}>
				<Section>
				<div className={styles.panel_container}>
			<div className={styles.panel}>
				<div className={styles.box}>
					<h2>Short</h2>
					<p>
						A <small>little</small> tip goes a long way...
					</p>
					<form>
					<input className={styles.input} placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment" onChange={onMsgChange}></TextArea>
					<div className={styles.button_container}>
						<Button theme="primary" type="button" text="Tip a 'lil" onClick={buyCoffee}
						/>
					</div>
					</form>
				</div>
				<div className={styles.box}>
					<h2>Tall</h2>
					<p>
						The bigger they are, the more they're <big>tall</big>...
					</p>
					<form>
					<input className={styles.input} placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
					<Button theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
					</form>
				</div>
			</div>
			<div className={styles.panel}>
				<div className={styles.box}>
					<h2>Grande</h2>
					<p>
						Your making a grand difference...
					</p>
					<form>
					<input className={styles.input} placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
					<Button className={styles.button} theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
					</form>
				</div>
				<div className={styles.box}>
					<h2>Trenta</h2>
					<p>
						Low on wit, require caffeine immediately
					</p>
					<form>
					<input className={styles.input} placeholder="Tell me who you are"></input>
					<TextArea placeholder="Leave me a comment"></TextArea>
					<div className={styles.button_container}>
					<Button theme="primary" type="button" text="Tip a 'lil"
						/>
					</div>
					</form>
				</div>
			</div>
		</div>
				</Section>
			</main>

			{currentAccount && (<h1> Memos received</h1>)}

			{currentAccount && (memos.map((memo, x) => {
				return (
					<div key={x} style={{border: '2px solid', 'border-radius':'5px', padding: '5px', margin: '5px'}}>
						<p style={{'font-weight':'bold'}}>"{memo.message}"</p>
						<p> From: {memo.name} at {memo.timestamp.toString()}</p>
					</div>
				)
			}))}
		</div>
	);
}
