//

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../tools/Icon';

// import './search.scss';

class Search extends React.Component {
	state = {
		term: ''
	};

	onFormSubmit = event => {
		event.preventDefault();
		this.props.onSubmit(this.state.term);
		// this.setState({ term: '' });
	};

	handleChange = event => {
		const { value } = event.target;
		this.setState({ term: value });
		// this.props.onSubmit(value);
	};

	render() {
		console.log('Search::render()');
		return (
			<section className="search">
				<form className="search-form" onSubmit={this.onFormSubmit}>
					<div className="search-field">
						<input
							id="search"
							type="text"
							value={this.state.term}
							onChange={e => this.handleChange(e)}
							placeholder="User name"
							className="search-input"
						/>
						<button type="button" className="search-button">
							<Icon name="search" css="search-icon" />
						</button>
					</div>
				</form>
			</section>
		);
	}
}

Search.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default Search;
