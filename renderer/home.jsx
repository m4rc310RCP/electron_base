import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
	return (
		<div className="main">
			<h1>This is React inside Electron!</h1>
			<br />
			<h3>Home</h3>
			<br />

			<Link to="/about">About</Link>

			<br />

			<button
				onClick={() => {
					electron.notificationApi.sendNotification("My custom notification!")
				}}
			>
				Send notification
			</button>
		</div>
	)
}

export default Home
