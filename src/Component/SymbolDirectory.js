import React, { Component, PropTypes } from 'react'

function fetchListings() {
  d3.csv("https://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=AMEX&render=download").then(function (data) {
    console.log(data);
  });
}


class SymbolDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: [
        {
          exchangeID: "NYSE",
          name      : "New York Stock Exchange"
        },
        {
          exchangeID: "AMEX",
          name      : "American Exchange"
        },
        {
          exchange: "NASDAQ",
          name    : "NASDAQ Exchange"
        }
      ]
    }
  }
  render() {
    return (
      <div>
        re
      </div>
    )
  }
}
SymbolDirectory.propTypes = {

}

export default SymbolDirectory 