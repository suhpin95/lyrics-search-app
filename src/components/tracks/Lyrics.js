import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
export default class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        // console.log(res.data);
        return axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
          )
          .then((res) => {
            //  console.log(res.data)
            this.setState({ track: res.data.message.body.track });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      console.log(track);
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by {""}
            </h5>
            <span className="text-secondary">{track.artist_name}</span>
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID:</strong>
              {track.track_id} <br />
              <strong>Genre:</strong>
              {
                track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name
              }
            </li>
            <li className="list-group-item">
              <strong>Explicit:</strong>
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Release Date:</strong>
              {track.updated_time}
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}
