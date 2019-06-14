//

import React from 'react';

import axios from 'axios';

const TOKEN = process.env.GITHUB_TOKEN;

class Followers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			count: props.count,
			url: props.url,
			followers: [],
			page: null,
			error: null,
			isLoading: false
		};
	}

	componentDidMount() {
		console.log('>>> Followers; componentDidMount; props ', this.props);
		this.fetchFollowers();
		console.log('<<< Followers; componentDidMount');
	}

	// TODO; may not need this...
	componentDidUpdate(prevProps) {
		console.log('>>> Followers; componentDidUpdate; props ', this.props, ' prevProps ', prevProps);
		if (prevProps.id !== this.props.id) {
			console.log('--- Followers; componentDidUpdate; get fetchFollowers');
			this.fetchFollowers();
		}
		console.log('<<< Followers; componentDidUpdate');
	}

	fetchFollowers = (page = 1) => {
		console.log(
			'*** Followers::fetchFollowers; page ',
			page,
			' this.state ',
			this.state,
			' pageCount ',
			this.pageCount()
		);
		if (page < 1 || page > this.pageCount()) {
			return;
		}
		this.setState({ isLoading: true });
		axios
			.get(this.state.url, {
				params: {
					page
				},
				headers: {
					Authorization: `token ${TOKEN}`
				}
			})
			.then(response => {
				const { data } = response;
				this.setState({
					followers: data,
					error: null,
					isLoading: false,
					page
				});
			})
			.catch(error => {
				this.setState({
					followers: null,
					error,
					isLoading: false,
					page: null
				});
			});
	};

	handlePrevious = () => {
		this.fetchFollowers(this.state.page - 1);
	};

	handleNext = () => {
		this.fetchFollowers(this.state.page + 1);
	};

	pageCount = () => {
		return Math.ceil(this.state.count / 30);
	};

	renderList() {
		console.log('Followers::renderList(); props ', this.props, ' this.state ', this.state);
		const { followers } = this.state;
		return followers.map(item => (
			<figure key={item.id} className="followers--item">
				<img src={item.avatar_url} alt={item.login} />
				<figcaption>
					<p>{item.login}</p>
				</figcaption>
			</figure>
		));
	}

	render() {
		console.log('Followers::render(); props ', this.props, ' this.state ', this.state);
		const { followers, page, isLoading, error } = this.state;
		if (isLoading) {
			return <p>Loading ...</p>;
		}
		if (error) {
			return <p>{error.message}</p>;
		}
		if (!page || !followers[page]) {
			return null;
		}

		const isMore = page < this.pageCount();
		const isPrevious = page > 1;
		console.log('isMore ', isMore, ' isPrevious ', isPrevious);

		return (
			<section className="followers">
				<h2 className="followers--header">Followers</h2>

				<div className="followers--list">{this.renderList()}</div>

				<div className="followers--buttons">
					<button type="button" className="followers--button" onClick={this.handlePrevious} disabled={!isPrevious}>
						Previous...
					</button>
					<div className="followers--text">
						Page {page} of {this.pageCount()}
					</div>
					<button type="button" className="followers--button" onClick={this.handleNext} disabled={!isMore}>
						Next...
					</button>
				</div>
			</section>
		);
	}
}

export default Followers;

/*
	fetchFollowers = async url => {
		console.log('*** Followers::fetchFollowers');
		try {
			const response = await axios.get(url);
			// console.log('response ', response);
			// console.log('Success!');
			// console.log(response.status);
			// console.log(response.data);
			const { data } = response;
			this.setState({ followers: data, error: null });
		} catch (e) {
			// console.error('Failure!');
			// console.error(e.response.status);
			// console.log('response ', e.response);
			this.setState({ followers: null, error: `${e.response.data.message}` });
		}
	};
*/
