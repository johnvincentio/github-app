//

import React from 'react';

/* eslint-disable react/prefer-stateless-function */

class UserButtons extends React.Component {
	render() {
		const { user } = this.props;
		return (
			<div className="user--buttons">
				<a href={user.html_url} className="user--button github" target="_blank" rel="noopener noreferrer">
					Github Profile
				</a>
				<button type="button" className="user--button">
					Followers: {user.followers}
				</button>
				<button type="button" className="user--button">
					Following: {user.following}
				</button>
				<button type="button" className="user--button">
					Public Repos: {user.public_repos}
				</button>
				<button type="button" className="user--button">
					Public Gists: {user.public_gists}
				</button>
			</div>
		);
	}
}

export default UserButtons;
