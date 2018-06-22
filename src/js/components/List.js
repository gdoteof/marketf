import React from "react";
import Remove from "./Remove";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return { listings: state.listings };
};

const ConnectedList = ({ listings }) => (
  <ul className="list-group list-group-flush">
    {listings.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.name} - ${el.price} - {el.user} - {el.createdAt}
        <Remove id={el.id}/>
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
