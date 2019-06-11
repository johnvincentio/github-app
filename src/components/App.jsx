//

import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Search from './search/Search';
import User from './User';
import Followers from './Followers';

// import jsondata from '../apis/github';

import './App.scss';

class App extends React.Component {
	state = {
		users: {},
		user: null,
		errorText: null
	};

	/*
	onSearchSubmit = async (term) => {
		const response = await youtube.get('/search', {
			params: { q: term }
		});
		console.log('response ', response);
		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]
		});
	};
*/

	onSearchSubmit = search => {
		console.log('App::onSearchSubmit; search ', search);
		this.setState({ user: null });
		this.fetchData(search);
	};

	async fetchData(search) {
		try {
			const response = await axios.get(`https://api.github.com/users/${search}`);
			console.log('response ', response);
			console.log('Success!');
			console.log(response.status);
			console.log(response.data);
			const { data } = response;
			this.setState({ users: { id: data.id, user: data }, user: data.id, errorText: null });
		} catch (e) {
			console.error('Failure!');
			console.error(e.response.status);
			console.log('response ', e.response);
			this.setState({ user: null, errorText: `User ${search}; ${e.response.data.message}` });
		}
	}

	render() {
		console.log('App::render()');
		const { users, user } = this.state;
		console.log('App::render(); user ', user, ' users ', users);
		const listUser = user !== null;
		return (
			<div className="ui container">
				<div className="outer">App...</div>
				<div>Search for a User</div>
				<Search onSubmit={this.onSearchSubmit} errorText={this.state.errorText} />
				{listUser && <User user={users.user} />}
				{listUser && <Followers id={users.user.id} url={users.user.followers_url} />}
			</div>
		);
	}
}

export default App;

/*
	async fetchData(search) {
		try {
			const response = await jsondata.get(`./users/${search}`);
			console.log('response ', response);
			console.log('Success!');
			console.log(response.status);
			console.log(response.data);
			const { data } = response;
			this.setState({ users: { id: data.id, user: data }, user: data.id, errorText: null });
		} catch (e) {
			console.error('Failure!');
			console.error(e.response.status);
			console.log('response ', e.response);
			this.setState({ user: null, followers: null, errorText: `User ${search}; ${e.response.data.message}` });
		}
	}
*/
