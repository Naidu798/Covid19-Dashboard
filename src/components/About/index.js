import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import Loading from '../Loading'

import './index.css'

class About extends Component {
  state = {
    faqsList: [],
    isLoading: true,
  }

  componentDidMount = () => {
    this.getFaqs()
  }

  getFaqs = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()
    const faqData = data.faq

    this.setState({faqsList: faqData, isLoading: false})
  }

  renderFaqsList = () => {
    const {faqsList} = this.state

    return (
      <ul testid="faqsUnorderedList" className="question-and-answer">
        {faqsList.map(eachFaq => {
          const {answer, question, qno} = eachFaq

          return (
            <li key={qno}>
              <p className="question">{question}</p>
              <p className="answer">{answer}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <Header />
        {isLoading ? (
          <Loading testId="aboutRouteLoader" />
        ) : (
          <div className="about-container">
            <h1 className="about-heading">About</h1>
            <p className="about-updated">last updated on march 28th 2021.</p>
            <p className="about-text">
              COVID-19 vaccines be ready for distribution
            </p>
            {this.renderFaqsList()}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}

export default About
