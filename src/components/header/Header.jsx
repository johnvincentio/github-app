//

import React from 'react';

import Search from './Search';

/* eslint-disable react/prefer-stateless-function */

class Header extends React.Component {
	render() {
		return (
			<header className="header" role="banner">
				<h1 className="header--title">MyGithub</h1>
				<h2 className="header--subtitle">Lookup your favorite Github users</h2>
				<Search onSubmit={this.props.onSubmit} />
			</header>
		);
	}
}

export default Header;
