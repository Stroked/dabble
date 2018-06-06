import React, { Component, PropTypes } from 'react'

class SymbolDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: [
        {
          exchangeID: "NYSE",
          name: "New York Stock Exchange"
        },
        {
          exchangeID: "AMEX",
          name: "American Exchange"
        },
        {
          exchange: "NASDAQ",
          name: "NASDAQ Exchange"
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