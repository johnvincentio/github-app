//

import React from 'react';

/* eslint-disable react/prefer-stateless-function */

class Follower extends React.Component {
	render() {
		// console.log('Follower::render(); props ', this.props);
		const { data } = this.props;
		return (
			<div>
				<div>id: {data.id}</div>
				<div>login: {data.login}</div>
				<div>avatar_url: {data.avatar_url}</div>
			</div>
		);
	}
}

export default Follower;
