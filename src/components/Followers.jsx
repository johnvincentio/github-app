//

import React from 'react';

import axios from 'axios';

import Follower from './Follower';

const TOKEN = process.env.GITHUB_TOKEN;

class Followers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			count: props.count,
			followers: {},
			page: null,
			error: null,
			isLoading: false
		};
	}

	componentDidMount() {
		console.log('>>> Followers; componentDidMount; props ', this.props);
		this.fetchFollowers(this.props.url);
		console.log('<<< Followers; componentDidMount');
	}

	componentDidUpdate(prevProps) {
		console.log('>>> Followers; componentDidUpdate; props ', this.props, ' prevProps ', prevProps);
		if (prevProps.id !== this.props.id) {
			console.log('>>> Followers; componentDidUpdate; get fetchFollowers');
			this.fetchFollowers(this.props.url);
		}
		console.log('<<< Followers; componentDidUpdate');
	}

	/*
  handleClick = () => {
    // this.setState({ open: !this.state.open });
    this.setState(prevState => ({ open: !prevState.open }));
	};
					headers: {
					Authorization: `token ${TOKEN}`
				}
*/

	fetchFollowers = (url, page = null) => {
		if (!page) {
			page = 1;
		}
		console.log('*** Followers::fetchFollowers; page ', page);
		this.setState({ isLoading: true });
		axios
			.get(url, {
				params: {
					page
				},
				headers: {
					Authorization: `token ${TOKEN}`
				}
			})
			.then(response => {
				const { data } = response;

				console.log('page ', page);
				const obj = {};
				obj[page] = data;

				console.log('obj ', obj);
				// const abc = { ...this.state.followers, ...fred };
				// // abc.page = data;
				// console.log('abc ', abc);
				//     this.setState(prevState => ({ open: !prevState.open }));
				this.setState(prevState => ({
					followers: { ...prevState.followers, ...obj },
					error: null,
					isLoading: false,
					page
				}));

				// this.setState({
				// 	followers: { ...this.state.followers, ...obj },
				// 	error: null,
				// 	isLoading: false,
				// 	page
				// });
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
		console.log('Followers::handlePrevious; this.state ', this.state, ' pageCount ', this.pageCount());
		if (this.state.page - 1 > 0) {
			this.fetchFollowers(this.props.url, this.state.page - 1);
		}
	};

	handleNext = () => {
		console.log('Followers::handleNext; this.state ', this.state, ' pageCount ', this.pageCount());
		if (this.state.page + 1 <= this.pageCount()) {
			this.fetchFollowers(this.props.url, this.state.page + 1);
		}
	};

	pageCount = () => {
		return Math.ceil(this.state.count / 30);
	};

	renderList() {
		console.log('Followers::renderList(); props ', this.props, ' this.state ', this.state);
		const { page, followers } = this.state;
		const items = followers[page];
		console.log('items ', items);
		const renderedList = items.map(follower => <Follower key={follower.id} data={follower} />);
		return <div className="ui relaxed divided list">{renderedList}</div>;
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
			return <p>no page found</p>;
		}
		// const isMore =
		return (
			<div>
				<div>
					<button type="button" className="more-button" onClick={this.handlePrevious}>
						previous...
					</button>
					<button type="button" className="more-button" onClick={this.handleNext}>
						next...
					</button>
				</div>
				<div>{this.renderList()}</div>
			</div>
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
