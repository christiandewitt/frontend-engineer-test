import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../actions/movie';
import PropTypes from 'prop-types';
import Search from './Search';

class MovieSearch extends Component {
    componentDidMount() {
        this.props.fetchMovies();
    }

    render() {
        return <Search placeholder="Select a movie" optionLabel="title" optionValue="data" filterBy="title" {...this.props} />;
    }
}

MovieSearch.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

function parseListData(list) {
    return list.map(movie => {
        return {
            data: movie,
            title: movie.title
        };
    })
}

const mapStateToProps = state => (
    {
        items: parseListData(state.movie.list)
    }
);

export default connect(mapStateToProps, { fetchMovies })(MovieSearch);