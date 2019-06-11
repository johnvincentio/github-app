//

import React from 'react';

import axios from 'axios';

import Follower from './Follower';

/* eslint-disable react/prefer-stateless-function */

class Followers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			url: props.url,
			followers: []
		};
	}

	componentDidMount() {
		console.log('>>> Followers; componentDidMount; props ', this.props);
		this.fetchFollowers();
		console.log('<<< Followers; componentDidMount');
	}

	componentDidUpdate(prevProps) {
		console.log('>>> Followers; componentDidUpdate; props ', this.props, ' prevProps ', prevProps);
		if (prevProps.id !== this.props.id) {
			console.log('>>> Followers; componentDidUpdate; get fetchFollowers');
			this.fetchFollowers();
		}
		console.log('<<< Followers; componentDidUpdate');
	}

	async fetchFollowers() {
		console.log('*** Followers::fetchFollowers');
		try {
			const response = await axios.get(this.state.url);
			console.log('response ', response);
			console.log('Success!');
			console.log(response.status);
			console.log(response.data);
			const { data } = response;
			this.setState({ followers: data, errorText: null });
		} catch (e) {
			console.error('Failure!');
			console.error(e.response.status);
			console.log('response ', e.response);
			this.setState({ followers: null, errorText: `${e.response.data.message}` });
		}
	}

	renderList() {
		const renderedList = this.state.followers.map(follower => <Follower key={follower.id} data={follower} />);
		return <div className="ui relaxed divided list">{renderedList}</div>;
	}

	render() {
		console.log('Followers::render(); props ', this.props, ' this.state ', this.state);
		return <div>{this.renderList()}</div>;
	}
}

export default Followers;
