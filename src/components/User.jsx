//

import React from 'react';

/* eslint-disable react/prefer-stateless-function */

class User extends React.Component {
	render() {
		const { data } = this.props;
		console.log('User::render(); props ', this.props);
		return (
			<div>
				<div>name: {data.name}</div>
			</div>
		);
	}
}

export default User;
