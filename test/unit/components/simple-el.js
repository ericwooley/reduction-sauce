import React, { PropTypes } from 'react'

const SimpleEl = ({title, subtitle}) => (
  <div>
    <h1>Title: {title}</h1>
    <p>{subtitle}</p>
  </div>
)

SimpleEl.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default SimpleEl
