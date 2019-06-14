//

import React from 'react';

import Search from './Search';

/* eslint-disable react/prefer-stateless-function */

/*
				<Search onSubmit={this.onSearchSubmit} error={this.state.error} />
				{error && <div>Error: {error}</div>}
*/

class Header extends React.Component {
	render() {
		console.log('Header::render; props ', this.props);
		return (
			<header className="header" role="banner">
				<h1 className="header--title">MyGithub</h1>
				<h2 className="header--subtitle">Lookup your favorite Github users</h2>

				<Search onSubmit={this.props.onSubmit} error={this.props.error} />

				{/* <section role="search">
					<form>
						<input
							className="header--search input-field"
							autoFocus
							placeholder="Search Users..."
							type="text"
							name="user-name"
							id="user-name"
						/>
					</form>
				</section> */}
				<div className="error">Error text</div>
			</header>
		);
	}
}

export default Header;
