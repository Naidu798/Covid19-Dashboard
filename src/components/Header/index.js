import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {MdMenuOpen} from 'react-icons/md'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onMenuBtn = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onCloseBtn = () => {
    this.setState({showMenu: false})
  }

  renderMobileMenu = () => {
    const {match} = this.props
    const {path} = match

    const activeHomeClassName = path === '/' ? 'active-nav-item' : ' '
    const activeAboutClassName = path === '/about' ? 'active-nav-item' : ''

    return (
      <div className="mobile-menu-container">
        <ul className="mobile-menu-items">
          <li className="menu-item">
            <Link to="/" className={`nav-item ${activeHomeClassName}`}>
              Home
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/about" className={`nav-item ${activeAboutClassName}`}>
              about
            </Link>
          </li>
        </ul>
        <button type="button" className="close-btn" onClick={this.onCloseBtn}>
          <RiCloseCircleFill className="close-circle" size={22} />
        </button>
      </div>
    )
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match

    const activeHomeClassName = path === '/' ? 'active-nav-item' : ' '
    const activeAboutClassName = path === '/about' ? 'active-nav-item' : ''

    return (
      <div>
        <div className="header-container">
          <Link className="mobile-nav-link-logo" to="/">
            <h1 className="head-covid19-heading">
              COVID19<span className="head-india">INDIA</span>
            </h1>
          </Link>
          <button
            type="button"
            className="menu-btn-container"
            onClick={this.onMenuBtn}
          >
            <MdMenuOpen size={30} color="#ffffff" />
          </button>
          <ul className="nav-link-items">
            <li key={0}>
              <Link className="nav-link" to="/">
                <h1 className="head-covid19-heading">
                  COVID19<span className="head-india">INDIA</span>
                </h1>
              </Link>
            </li>
            <div className="nav-items-list">
              <li className="nav-link-item" key={1}>
                <Link className={`nav-link ${activeHomeClassName}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-link-item" key={2}>
                <Link
                  className={`nav-link ${activeAboutClassName}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </div>
          </ul>
        </div>
        {showMenu ? this.renderMobileMenu() : ''}
      </div>
    )
  }
}

export default withRouter(Header)
