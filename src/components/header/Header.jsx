//

import React from 'react';

/* eslint-disable react/prefer-stateless-function */

class Header extends React.Component {
	render() {
		return (
			<header className="header" role="banner">
				<h1 className="header--title">MyGithub</h1>
				<h2 className="header--subtitle">Lookup your favorite Github users</h2>

				<section role="search">
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
				</section>
				<div className="error">Error text</div>
			</header>
		);
	}
}

export default Header;
