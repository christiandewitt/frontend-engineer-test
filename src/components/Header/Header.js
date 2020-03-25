import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import MovieSearch from '../Search/MovieSearch';
import { setCurrentMovie } from '../../actions/movie';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(value) {
        this.props.setCurrentMovie(value);
    }

    render() {
        return <div>
            <Navbar bg="dark" variant="dark" className="justify-content-between">
                <Navbar.Brand href="#">
                    <img
                        alt="logo"
                        src={this.props.logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    {this.props.title}
                </Navbar.Brand>
                <MovieSearch onChange={this.onSearch} />
            </Navbar>
        </div>;
    }
}

Header.propTypes = {
    setCurrentMovie: PropTypes.func.isRequired
};

export default connect(null, { setCurrentMovie })(Header);