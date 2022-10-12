import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Section } from "./layout/section";
import abi from "./utils/BuyMeACoffee.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, CryptoLogos, TextArea } from "@web3uikit/core";

export default function Home() {
	const contractAddr = "0x5Cc2fF86fEDA7698769F4ed960a23DB6Cc81CA64";
	const contractAbi = abi.abi;

	const [currentAccount, setCurrentAcc] = useState("");
	const [name, setName] = useState("");
	const [msg, setMsg] = useState("");
	const [memos, setMemos] = useState([0]);

	const onNameChange = (e) => {
		setName(e.target.value);
	};
	const onMsgChange = (e) => {
		setMsg(e.target.value);
	};

	const isWalletConnected = async () => {
		try {
			const { ethereum } = window;
			const accounts = await ethereum.request({ method: "eth_accounts" });
			console.log("accounts: ", accounts);

			if (accounts.length > 0) {
				const account = accounts;
				setCurrentAcc(account);
				console.log("wallet is connected! " + account);
			} else {
				console.log("no wallet connected");
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	const buySmallCoffee = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(
					ethereum,
					"any"
				);
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddr,
					contractAbi,
					signer
				);

				console.log("buying coffee...");
				const coffeeTx = await buyMeACoffee.buyCoffee(
					name ? name : "anon",
					msg ? msg : "Enjoy your coffee!",
					{ value: ethers.utils.parseEther("0.001") }
				);

				await coffeeTx.wait();

				console.log("mined: ", coffeeTx.hash);
				console.log("coffee purchased!");
				setName("");
				setMsg("");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const buyTallCoffee = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(
					ethereum,
					"any"
				);
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddr,
					contractAbi,
					signer
				);

				console.log("buying coffee...");
				const coffeeTx = await buyMeACoffee.buyCoffee(
					name ? name : "anon",
					msg ? msg : "Enjoy your coffee!",
					{ value: ethers.utils.parseEther("0.01") }
				);

				await coffeeTx.wait();

				console.log("mined: ", coffeeTx.hash);
				console.log("coffee purchased!");
				setName("");
				setMsg("");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const buyGrandeCoffee = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(
					ethereum,
					"any"
				);
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddr,
					contractAbi,
					signer
				);

				console.log("buying coffee...");
				const coffeeTx = await buyMeACoffee.buyCoffee(
					name ? name : "anon",
					msg ? msg : "Enjoy your coffee!",
					{ value: ethers.utils.parseEther("0.1") }
				);

				await coffeeTx.wait();

				console.log("mined: ", coffeeTx.hash);
				console.log("coffee purchased!");
				setName("");
				setMsg("");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const buyTrentaCoffee = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(
					ethereum,
					"any"
				);
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddr,
					contractAbi,
					signer
				);

				console.log("buying coffee...");
				const coffeeTx = await buyMeACoffee.buyCoffee(
					name ? name : "anon",
					msg ? msg : "Enjoy your coffee!",
					{ value: ethers.utils.parseEther("0.5") }
				);

				await coffeeTx.wait();

				console.log("mined: ", coffeeTx.hash);
				console.log("coffee purchased!");
				setName("");
				setMsg("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getMemos = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const buyMeACoffee = new ethers.Contract(
					contractAddr,
					contractAbi,
					signer
				);
				console.log("fetching memos from the blockchain...");
				const memos = await buyMeACoffee.getMemos();
				console.log("fetched!");
				setMemos(memos);
			} else {
				console.log("Metamask is not connected");
			}
		} catch (error) {
			console.log(error);
		}
	};

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
					name,
				},
			]);
		};

		const { ethereum } = window;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum, "any");
			const signer = provider.getSigner();
			buyMeACoffee = new ethers.Contract(
				contractAddr,
				contractAbi,
				signer
			);
			buyMeACoffee.on("NewMemo", onNewMemo);
		}

		return () => {
			if (buyMeACoffee) {
				buyMeACoffee.off("NewMemo", onNewMemo);
			}
		};
	}, []);

	return (
		<div>
			<header className={styles.header_container}>
				<div className={styles.navbar}>
					<ConnectButton></ConnectButton>
				</div>
				<div className={styles.logo_container}>
					<h1 className={styles.logo}>☕</h1>
					<h1 style={{ color: "#0e76fd" }}>Buy Keyrxng A Coffee</h1>
				</div>
			</header>
			<main className={styles.main}>
				<Section>
					<div className={styles.panel_container}>
						<div className={styles.panel}>
							<div className={styles.box}>
								<div
									style={{
										display: "flex",
									}}
								>
									<h2>Short</h2>
									<div
										style={{
											display: "flex",
											marginLeft: "39%",
										}}
									>
										<CryptoLogos
											chain="ethereum"
											size="35px"
										/>
										<h2>Ξ 0.001</h2>
									</div>
								</div>

								<p>
									A <small>little</small> tip goes a long
									way...
								</p>
								<form>
									<input
										className={styles.input}
										placeholder="Tell me who you are"
										onChange={onNameChange}
									></input>
									<TextArea
										placeholder="Leave me a comment"
										onChange={onMsgChange}
									></TextArea>
									<div className={styles.button_container}>
										<Button
											theme="primary"
											type="button"
											text="Tip a 'lil"
											onClick={buySmallCoffee}
										/>
									</div>
								</form>
							</div>
							<div className={styles.box}>
								<div
									style={{
										display: "flex",
									}}
								>
									<h2>Tall</h2>
									<div
										style={{
											display: "flex",
											marginLeft: "52%",
										}}
									>
										<CryptoLogos
											chain="ethereum"
											size="35px"
										/>
										<h2>Ξ 0.01</h2>
									</div>
								</div>
								<p>
									The bigger they are, the more they're{" "}
									<big>tall</big>...
								</p>
								<form>
									<input
										className={styles.input}
										placeholder="Tell me who you are"
										onChange={onNameChange}
									></input>
									<TextArea
										placeholder="Leave me a comment"
										onChange={onMsgChange}
									></TextArea>
									<div className={styles.button_container}>
										<Button
											theme="primary"
											type="button"
											text="Tip a 'lil"
											onClick={buyTallCoffee}
										/>
									</div>
								</form>
							</div>
						</div>
						<div className={styles.panel}>
							<div className={styles.box}>
								<div
									style={{
										display: "flex",
									}}
								>
									<h2>Grande</h2>
									<div
										style={{
											display: "flex",
											marginLeft: "41%",
										}}
									>
										<CryptoLogos
											chain="ethereum"
											size="35px"
										/>
										<h2>Ξ 0.1</h2>
									</div>
								</div>
								<p>Your making a grand difference...</p>
								<form>
									<input
										className={styles.input}
										placeholder="Tell me who you are"
										onChange={onNameChange}
									></input>
									<TextArea
										placeholder="Leave me a comment"
										onChange={onMsgChange}
									></TextArea>
									<div className={styles.button_container}>
										<Button
											className={styles.button}
											theme="primary"
											type="button"
											text="Tip a 'lil"
											onClick={buyGrandeCoffee}
										/>
									</div>
								</form>
							</div>
							<div className={styles.box}>
								<div
									style={{
										display: "flex",
									}}
								>
									<h2>Trenta</h2>
									<div
										style={{
											display: "flex",
											marginLeft: "46%",
										}}
									>
										<CryptoLogos
											chain="ethereum"
											size="35px"
										/>
										<h2>Ξ 0.5</h2>
									</div>
								</div>
								<p>Low on wit, require caffeine immediately</p>
								<form>
									<input
										className={styles.input}
										placeholder="Tell me who you are"
										onChange={onNameChange}
									></input>
									<TextArea
										placeholder="Leave me a comment"
										onChange={onMsgChange}
									></TextArea>
									<div className={styles.button_container}>
										<Button
											theme="primary"
											type="button"
											text="Tip a 'lil"
											onClick={buyTrentaCoffee}
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</Section>
			</main>

			{currentAccount && (
				<h1
					style={{ color: "#0e76fd" }}
					className={styles.logo_container}
				>
					{" "}
					☕ Coffees & Comments ☕{" "}
				</h1>
			)}

			{currentAccount &&
				memos.map((memo, x) => {
					console.log("memos: ", memo);
					return (
						<div className={styles.panel_container} key={x}>
							<div className={styles.button}>
								<p style={{ "font-weight": "bold" }}>
									"{memo.message}"
								</p>
								<p>
									{" "}
									From: {memo.name} at{" "}
									{new Date(memo.timestamp * 1000).toString()}
								</p>
							</div>
						</div>
					);
				})}
		</div>
	);
}
