import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import Loading from '../Loading'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const updatedStatesList = statesList.map(eachItem => ({
  stateCode: eachItem.state_code,
  stateName: eachItem.state_name,
}))

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    totalCasesDataList: {},
    stateWiseCovidCasesTableData: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    const data = await response.json()

    if (response.ok === true) {
      let confirmedCases = 0
      let recoveredCases = 0
      let deceasedCases = 0
      let activeCases = 0

      updatedStatesList.map(eachItem => {
        const {stateCode} = eachItem
        const stateDetails = data[stateCode]
        const stateTotalDetails = stateDetails.total

        confirmedCases += stateTotalDetails.confirmed
        recoveredCases += stateTotalDetails.recovered
        deceasedCases += stateTotalDetails.deceased
        activeCases = confirmedCases - recoveredCases - deceasedCases

        return null
      })

      const totalCasesData = {
        confirmedCases,
        recoveredCases,
        deceasedCases,
        activeCases,
      }
      const stateWiseTotalCasesList = []
      updatedStatesList.map(eachState => {
        const {stateName, stateCode} = eachState
        const stateDetails = data[stateCode].total
        const statePopulation = data[stateCode].meta

        const updatedStateDetails = {
          stateName,
          stateCode,
          confirmed: stateDetails.confirmed,
          recovered: stateDetails.recovered,
          deceased: stateDetails.deceased,
          active:
            stateDetails.confirmed -
            (stateDetails.recovered + stateDetails.deceased),
          population: statePopulation.population,
        }
        stateWiseTotalCasesList.push(updatedStateDetails)

        return null
      })

      this.setState({
        totalCasesDataList: totalCasesData,
        stateWiseCovidCasesTableData: stateWiseTotalCasesList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    const filteredSearchResults = updatedStatesList.filter(eachState => {
      const {stateName} = eachState
      const lowerStateName = stateName.toLowerCase()
      const searchValue = searchInput.toLowerCase()

      if (lowerStateName.includes(searchValue)) {
        return eachState
      }
      return null
    })

    return (
      <div className="search-container">
        <div className="search-btn-input">
          <button type="button" className="search-btn">
            <BsSearch className="search-icon" />
          </button>
          <input
            type="search"
            className="input-search"
            placeholder="Enter the State"
            value={searchInput}
            onChange={this.onChangeSearch}
          />
        </div>
        {filteredSearchResults.length !== 36 ? (
          <ul testid="searchResultsUnorderedList" className="results-list">
            {filteredSearchResults.map(eachState => {
              const {stateName, stateCode} = eachState

              return (
                <Link to={`state/${stateCode}`} className="nav-link">
                  <li className="search-result-item box-hover" key={stateCode}>
                    <div className="search-results-state-and-right-arrow">
                      <p className="search-state-name">{stateName}</p>
                      <div type="button" className="state-code-and-right-arrow">
                        <p className="search-state-code">{stateCode}</p>
                        <BiChevronRightSquare color="#FACC15" size={22} />
                      </div>
                    </div>
                    <hr className="hr-line" />
                  </li>
                </Link>
              )
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }

  renderCountryWideCasesData = () => {
    const {totalCasesDataList} = this.state
    const {
      confirmedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
    } = totalCasesDataList

    return (
      <div className="cases-details-list">
        <div className="cases-detail-item" testid="countryWideConfirmedCases">
          <p className="confirmed type-text">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1684647856/check-mark_1_gyahrd.png"
            alt="country wide confirmed cases pic"
            className="case-type-icon"
          />
          <p className="cases-count confirmed">{confirmedCases}</p>
        </div>
        <div className="cases-detail-item" testid="countryWideActiveCases">
          <p className="type-text active">Active</p>
          <img
            src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1684647915/protection_1_ainxui.png"
            alt="country wide active cases pic"
            className="case-type-icon"
          />
          <p className="cases-count active">{activeCases}</p>
        </div>
        <div className="cases-detail-item" testid="countryWideRecoveredCases">
          <p className="type-text recovered">Recovered</p>
          <img
            src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1685943571/recovered_1_tolyoa.png"
            alt="country wide recovered cases pic"
            className="case-type-icon"
          />
          <p className="cases-count recovered">{recoveredCases}</p>
        </div>
        <div className="cases-detail-item" testid="countryWideDeceasedCases">
          <p className="type-text deceased">Deceased</p>
          <img
            src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1684647897/Outline_nzzgj7.png"
            alt="country wide deceased cases pic"
            className="case-type-icon"
          />
          <p className="cases-count deceased">{deceasedCases}</p>
        </div>
      </div>
    )
  }

  onAscBtn = () => {
    const {stateWiseCovidCasesTableData} = this.state

    if (stateWiseCovidCasesTableData[0].stateName[0] !== 'A') {
      stateWiseCovidCasesTableData.reverse()
      this.setState({stateWiseCovidCasesTableData})
    }
  }

  onDscBtn = () => {
    const {stateWiseCovidCasesTableData} = this.state

    if (stateWiseCovidCasesTableData[0].stateName[0] === 'A') {
      stateWiseCovidCasesTableData.reverse()
      this.setState({stateWiseCovidCasesTableData})
    }
  }

  renderCovidCasesTable = () => {
    const {stateWiseCovidCasesTableData} = this.state

    return (
      <div testid="stateWiseCovidDataTable" className="covid-cases-table">
        <div className="table-row-headings">
          <div className="row-heading">
            <p className="states">States/UT</p>
            <button
              type="button"
              className="sorting-button"
              testid="ascendingSort"
              onClick={this.onAscBtn}
            >
              <FcGenericSortingAsc fill="#94A3B8" size={20} />
            </button>
            <button
              type="button"
              className="sorting-button"
              testid="descendingSort"
              onClick={this.onDscBtn}
            >
              <FcGenericSortingDesc fill="#94A3B8" size={20} />
            </button>
          </div>
          <p className="table-column-case-type">Confirmed</p>
          <p className="table-column-case-type">Active</p>
          <p className="table-column-case-type">Recovered</p>
          <p className="table-column-case-type">Deceased</p>
          <p className="table-column-case-type">Population</p>
        </div>
        <ul className="state-wise-covid-cases-table">
          {stateWiseCovidCasesTableData.map(eachState => {
            const {
              stateName,
              confirmed,
              recovered,
              active,
              deceased,
              population,
            } = eachState

            return (
              <li className="state-cases-details-row" key={stateName}>
                <p className="state-name">{stateName}</p>
                <p className="confirmed">{confirmed}</p>
                <p className="active">{active}</p>
                <p className="recovered">{recovered}</p>
                <p className="deceased">{deceased}</p>
                <p className="population">{population}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  onRetryBtn = () => {
    this.getCovidData()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We are having some trouble to complete your request.
        <br /> please try again.
      </p>
      <button type="button" className="retry-btn" onClick={this.onRetryBtn}>
        Retry
      </button>
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loading testId="homeRouteLoader" />
      case apiStatusConstants.success:
        return (
          <div className="home-container">
            {this.renderSearchInput()}
            {this.renderCountryWideCasesData()}
            {this.renderCovidCasesTable()}
            <Footer />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-route">
        <Header />
        {this.renderResult()}
      </div>
    )
  }
}

export default Home
