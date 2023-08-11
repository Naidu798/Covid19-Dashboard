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
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match

    const activeHomeClassName = path === '/' ? 'active-nav-button' : ' '
    const activeAboutClassName = path === '/about' ? 'active-nav-button' : ''

    return (
      <div className="mobile-menu-container">
        <div className="logo-and-menu-button">
          <Link to="/" className="nav-link">
            <h1 className="head-covid19-heading">
              COVID19<span className="head-india">INDIA</span>
            </h1>
          </Link>
          <button
            type="button"
            className="menu-button"
            onClick={this.onMenuBtn}
          >
            <MdMenuOpen size={36} fill="#fff" />
          </button>
        </div>
        {showMenu ? (
          <ul className="mobile-nav-items">
            <li key="m-nav-1">
              <Link to="/" className="nav-link">
                <button
                  type="button"
                  className={`nav-button ${activeHomeClassName}`}
                >
                  Home
                </button>
              </Link>
            </li>
            <li key="m-nav-2">
              <Link to="/about" className="nav-link">
                <button
                  type="button"
                  className={`nav-button ${activeAboutClassName}`}
                >
                  About
                </button>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="close-btn"
                onClick={this.onCloseBtn}
              >
                <RiCloseCircleFill size={22} fill="#fff" />
              </button>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }

  renderDesktopMenu = () => {
    const {match} = this.props
    const {path} = match

    const activeHomeClassName = path === '/' ? 'active-nav-button' : ' '
    const activeAboutClassName = path === '/about' ? 'active-nav-button' : ''

    return (
      <ul className="desktop-nav-items">
        <li key="d-nav-1">
          <Link to="/" className="nav-link">
            <h1 className="head-covid19-heading">
              COVID19<span className="head-india">INDIA</span>
            </h1>
          </Link>
        </li>
        <li key="d-nav-2">
          <Link to="/" className="nav-link">
            <button
              type="button"
              className={`nav-home-button nav-button ${activeHomeClassName}`}
            >
              Home
            </button>
          </Link>
        </li>
        <li key="d-nav-3">
          <Link to="/about" className="nav-link">
            <button
              type="button"
              className={`nav-about-button nav-button ${activeAboutClassName}`}
            >
              About
            </button>
          </Link>
        </li>
      </ul>
    )
  }

  render() {
    const {showMenu} = this.state

    return (
      <div>
        {this.renderDesktopMenu()}
        {this.renderMobileMenu()}
      </div>
    )
  }
}

export default withRouter(Header)
