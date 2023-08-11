import './index.css'

const NotFound = props => {
  const onRefreshBtn = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1686616984/Group_7484_vjvysg.png"
        alt="not-found-pic"
        className="not-found-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" className="refresh-home-btn" onClick={onRefreshBtn}>
        Home
      </button>
    </div>
  )
}

export default NotFound
