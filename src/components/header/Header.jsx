//

import React from 'react';

import Icon from '../tools/Icon';

/* eslint-disable react/prefer-stateless-function */

class Header extends React.Component {
	render() {
		return (
			<div>
				<header className="header">
					<button type="button" className="header--title-link" onClick={this.select}>
						<Icon name="github" css="header--icon" />
						GithubHelper
					</button>
					<button type="button" className="header--nav-link">
						SEARCH
					</button>
				</header>
				<div className="header--spacer"></div>
			</div>
		);
	}
}

export default Header;

/*
<header className="header">
	<a className="header--title-link" href="/">
		<Icon name="github" css="header--icon" />
		GithubHelper
	</a>
	<a className="header--nav-link" role="button" href="/signin">
		<span className="header--nav-text">Search</span>
	</a>
</header>
*/
