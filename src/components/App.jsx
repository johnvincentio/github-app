//

import React from 'react';
import PropTypes from 'prop-types';

import Search from './search/Search';
import User from './User';

import jsondata from '../apis/github';

import './App.scss';

class App extends React.Component {
	state = {
		users: {},
		user: null,
		error: false,
		errorText: null
	};

	componentDidMount() {
		console.log('>>> App; componentDidMount');
		// this.props.actions.getUserData();
		console.log('<<< App; componentDidMount');
	}

	onSearchSubmit = search => {
		console.log('onSearchSubmit; search ', search);
		this.setState({ user: null });
		this.fetchData(search);
	};

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
			this.setState({ user: null, errorText: `User ${search}; ${e.response.data.message}` });
		}
	}

	render() {
		console.log('render()');
		const { users, user } = this.state;
		console.log('user ', user, ' users ', users);
		const listUser = user !== null;
		return (
			<div className="ui container">
				<div className="outer">App...</div>
				<div>Search for a User</div>
				<Search onSubmit={this.onSearchSubmit} errorText={this.state.errorText} />
				{listUser && <User data={users.user} />}
			</div>
		);
	}
}

export default App;
