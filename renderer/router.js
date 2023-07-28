import React from "react"
import { HashRouter, Route, Switch } from "react-router-dom"

import Home from "./home.jsx"
import About from "./about.jsx"

const Router = () => {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
			</Switch>
		</HashRouter>
	)
}

export default Router
