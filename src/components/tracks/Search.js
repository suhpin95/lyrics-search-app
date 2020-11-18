import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";
export default class Search extends Component {
  state = {
    trackTitle: "",
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  findTrack = (dispatch, event) => {
    event.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res)
        dispatch({
          type: "SEARCH_TRACK",
          payload: res.data.message.body.track_list,
        });
        this.setState({ trackTitle: "" });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">Search for a song</h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song Title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <button
                  className="btn btn-dark btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get the Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
