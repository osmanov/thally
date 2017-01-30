import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Header = () => (
  <div>
    <h1>Thally</h1>
    <IndexLink to="/" activeClassName="route--active">
      Home
    </IndexLink>
    {' · '}
    <Link to="/counter" activeClassName="route--active">
      Counter
    </Link>
  </div>
)

export default Header
