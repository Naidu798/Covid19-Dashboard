import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-section">
    <div className="footer-container">
      <h1 className="covid19-heading">
        COVID19<span className="india">INDIA</span>
      </h1>
      <p className="footer-quote">
        we stand with everyone fighting on the front lines
      </p>
      <ul className="icons-list">
        <li>
          <VscGithubAlt fill="#CBD5E1" size={35} />
        </li>
        <li>
          <FiInstagram color="#CBD5E1" size={35} />
        </li>
        <li>
          <FaTwitter fill="#CBD5E1" size={35} />
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
