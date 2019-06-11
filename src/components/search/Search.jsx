//

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../tools/Icon';

import './search.scss';

class Search extends React.Component {
	state = {
		term: ''
	};

	onFormSubmit = event => {
		event.preventDefault();
		console.log(this.state.term);
		console.log(this.props);
		this.props.onSubmit(this.state.term);
		this.setState({ term: '' });
	};

	handleChange = event => {
		const { value } = event.target;
		this.setState({ term: value });
		// this.props.onSubmit(value);
	};

	render() {
		const error = this.props.errorText != null;
		return (
			<section className="search">
				<form className="search-form" onSubmit={this.onFormSubmit}>
					<div className="search-field">
						{/* <label htmlFor="search">
							Widget search */}
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
				{error && <div>Error: {this.props.errorText}</div>}
			</section>
		);
	}
}

Search.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default Search;
