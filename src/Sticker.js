import React from 'react'

class Sticker extends React.Component {
  static propTypes = {
    title: React.PropTypes.string
  }

  static defaultProps = {
    title:'ThallyBox'
  }

  render () {
    const { title } = this.props
    return (
      <div><span>{title}</span></div>
    )
  }
}
export default Sticker

