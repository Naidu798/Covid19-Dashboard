import Loader from 'react-loader-spinner'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Loading = props => {
  const {testId} = props

  return (
    <div data-testid={testId} className="loader">
      <Loader type="TailSpin" height={50} width={50} color="#007BFF" />
    </div>
  )
}

export default Loading
