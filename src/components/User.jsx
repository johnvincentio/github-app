//

import React from 'react';

/* eslint-disable react/prefer-stateless-function */

class User extends React.Component {
	render() {
		const { user } = this.props;
		console.log('User::render(); props ', this.props);
		return (
			<div>
				<div>name: {user.name}</div>
				<div>Followers: {user.followers}</div>
				<div>Repos_url: {user.repos_url}</div>
				<div>Avatar_url: {user.avatar_url}</div>
				<div>Followers_url: {user.followers_url}</div>
			</div>
		);
	}
}

export default User;
