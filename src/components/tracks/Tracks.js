import React, { Component } from "react";
import { Consumer } from "../../context.js";
import Spinner from "../layout/Spinner";
import Track from "./Track";
export default class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(values) => {
          const { track_list, heading } = values;
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading} in India </h3>
                <div className="row">
                  {track_list.map((item) => (
                    <Track track={item.track} key={item.track.track_id} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}
