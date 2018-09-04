import React from "react";
import Remove from "./Remove";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return { listings: state.listings };
};

const ConnectedList = ({ listings }) => (
  <ul className="list-group list-group-flush" key="listparent">
    {listings.map(el => (
      <li className="list-group-item" key={"LISTING_" + el.key}>
        {el.name} - ${el.price} - {el.user} - {el.createdAt} - {el.key}
        {el.photos && el.photos.map(p => (
          <img src={"/static/img/" + p} />
        ))}
        <Remove id={el.id}/>
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
