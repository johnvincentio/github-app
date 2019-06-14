//

import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Nav from './Nav';
import Header from './header/Header';

import User from './User';
import UserButtons from './UserButtons';

import Followers from './Followers';

const TOKEN = process.env.GITHUB_TOKEN;

class App extends React.Component {
	state = {
		users: {},
		user: null,
		error: null,
		isLoading: false
	};

	onSearchSubmit = async search => {
		this.setState({ isLoading: true });
		try {
			const response = await axios.get(`https://api.github.com/users/${search}`, {
				headers: {
					Authorization: `token ${TOKEN}`
				}
			});
			const { data } = response;
			this.setState({
				users: { id: data.id, user: data },
				user: data.id,
				error: null,
				isLoading: false
			});
		} catch (error) {
			this.setState({
				user: null,
				error,
				isLoading: false
			});
		}
	};

	render() {
		console.log('App::render()');
		const { users, user, isLoading, error } = this.state;

		console.log('App::render(); user ', user, ' users ', users);
		const listUser = user !== null;
		if (isLoading) {
			return <p>Loading ...</p>;
		}
		if (error) {
			return <p>{error.message}</p>;
		}
		return (
			<div>
				<Nav />
				<main role="main">
					<Header onSubmit={this.onSearchSubmit} error={this.state.error} />
					{listUser && <User user={users.user} />}
					{listUser && <UserButtons user={users.user} />}
					{listUser && <Followers id={users.user.id} url={users.user.followers_url} count={users.user.followers} />}
				</main>

				{/* <div>Search for a User</div>

				{listUser && <User user={users.user} />}
				{listUser && <Followers id={users.user.id} url={users.user.followers_url} count={users.user.followers} />}
			 */}
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

/*
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
*/

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

// onSearchSubmit2 = search => {
// 	console.log('App::onSearchSubmit; search ', search);
// 	this.setState({ user: null });
// 	this.fetchData(search);
// };
