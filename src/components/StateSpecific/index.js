import {Component} from 'react'
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  LineChart,
  Line,
  YAxis,
  Legend,
} from 'recharts'

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

const caseTypesConstants = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

const topDistrictsConstants = {
  CONFIRMED: {color: '#FF073A', listType: 'sortedConfirmed', type: 'confirmed'},
  ACTIVE: {color: '#007BFF', listType: 'sortedActive', type: 'active'},
  RECOVERED: {color: '#27A243', listType: 'sortedRecovered', type: 'recovered'},
  DECEASED: {color: '#6C757D', listType: 'sortedDeceased', type: 'deceased'},
}

const covidDailySpreadConstants = [
  {
    color: '#FF073A',
    className: 'daily-confirmed',
    type: 'confirmed',
    typeCountValue: 'Confirmed',
  },
  {
    color: '#007BFF',
    className: 'daily-active',
    type: 'active',
    typeCountValue: 'Active',
  },
  {
    color: '#27A243',
    className: 'daily-recovered',
    type: 'recovered',
    typeCountValue: 'Recovered',
  },
  {
    color: '#6C757D',
    className: 'daily-deceased',
    type: 'deceased',
    typeCountValue: 'Deceased',
  },
  {
    color: '#9673B9',
    className: 'daily-tested',
    type: 'tested',
    typeCountValue: 'Tested',
  },
]

class StateSpecific extends Component {
  state = {
    stateTotalCasesList: {},
    districtWiseCasesTypesSortedList: {
      sortedConfirmed: [],
      sortedActive: [],
      sortedRecovered: [],
      sortedDeceased: [],
    },
    activeCaseType: caseTypesConstants.confirmed,
    dateWiseBarChartCasesTypes: {},
    dateWiseLineChartCasesTypes: {},
    isLoading: true,
    isTimeLineDataLoading: true,
  }

  componentDidMount = () => {
    this.getCovidData()
    this.getCovidGraphData()
  }

  getCovidGraphData = async () => {
    this.setState({isTimeLineDataLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${id}`,
    )

    const data = await response.json()
    const dateKeys = Object.keys(data[id].dates)

    const confirmedBarChartList = []
    const activeBarChartList = []
    const recoveredBarChartList = []
    const deceasedBarChartList = []

    const confirmedLineChartList = [{date: 0, Confirmed: 0}]
    const activeLineChartList = [{date: 0, Active: 0}]
    const recoveredLineChartList = [{date: 0, Recovered: 0}]
    const deceasedLineChartList = [{date: 0, Deceased: 0}]
    const testedLineChartList = [{date: 0, Tested: 0}]

    dateKeys.map(eachDate => {
      const dateWiseCases = data[id].dates[eachDate].total
      const dateWiseLineCases = data[id].dates[eachDate].delta

      let confirmedCount = 0
      let recoveredCount = 0
      let deceasedCount = 0

      if (dateWiseCases.confirmed !== undefined) {
        confirmedCount = dateWiseCases.confirmed
      }
      if (dateWiseCases.recovered !== undefined) {
        recoveredCount = dateWiseCases.recovered
      }
      if (dateWiseCases.deceased !== undefined) {
        deceasedCount = dateWiseCases.deceased
      }

      confirmedBarChartList.push({
        date: eachDate,
        count: confirmedCount,
      })
      activeBarChartList.push({
        date: eachDate,
        count: confirmedCount - recoveredCount + deceasedCount,
      })
      recoveredBarChartList.push({
        date: eachDate,
        count: recoveredCount,
      })
      deceasedBarChartList.push({
        date: eachDate,
        count: deceasedCount,
      })

      let confirmedLineCount = 0
      let recoveredLineCount = 0
      let deceasedLineCount = 0
      let testedLineCount = 0

      if (dateWiseLineCases.confirmed !== undefined) {
        confirmedLineCount = dateWiseLineCases.confirmed
      }
      if (dateWiseLineCases.recovered !== undefined) {
        recoveredLineCount = dateWiseLineCases.recovered
      }
      if (dateWiseLineCases.deceased !== undefined) {
        deceasedLineCount = dateWiseLineCases.deceased
      }
      if (dateWiseLineCases.tested !== undefined) {
        testedLineCount = dateWiseLineCases.tested
      }

      confirmedLineChartList.push({
        date: eachDate,
        Confirmed: confirmedLineCount,
      })
      activeLineChartList.push({
        date: eachDate,
        Active: confirmedLineCount - deceasedLineCount,
      })
      recoveredLineChartList.push({
        date: eachDate,
        Recovered: recoveredLineCount,
      })
      deceasedLineChartList.push({
        date: eachDate,
        Deceased: deceasedLineCount,
      })
      testedLineChartList.push({
        date: eachDate,
        Tested: testedLineCount,
      })

      return null
    })

    const dateWiseBarChartCases = {
      confirmed: confirmedBarChartList.slice(0, 10),
      recovered: recoveredBarChartList.slice(0, 10),
      active: activeBarChartList.slice(0, 10),
      deceased: deceasedBarChartList.slice(0, 10),
    }

    const dateWiseLineChartCases = {
      confirmed: confirmedLineChartList,
      recovered: recoveredLineChartList,
      active: activeLineChartList,
      deceased: deceasedLineChartList,
      tested: testedLineChartList,
    }

    this.setState({
      dateWiseBarChartCasesTypes: dateWiseBarChartCases,
      dateWiseLineChartCasesTypes: dateWiseLineChartCases,
      isTimeLineDataLoading: false,
    })
  }

  getCovidData = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const activeState = updatedStatesList.find(
      eachState => eachState.stateCode === id,
    )

    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    const data = await response.json()

    const districtWiseData = []
    const districtNames = Object.keys(data[id].districts)
    districtNames.map(eachDist => {
      const districtData = data[id].districts[eachDist].total

      let confirmedCount = 0
      let recoveredCount = 0
      let deceasedCount = 0

      if (districtData.confirmed !== undefined) {
        confirmedCount = districtData.confirmed
      }
      if (districtData.recovered !== undefined) {
        recoveredCount = districtData.recovered
      }
      if (districtData.deceased !== undefined) {
        deceasedCount = districtData.deceased
      }

      const districtTotalData = {
        districtName: eachDist,
        confirmed: confirmedCount,
        recovered: recoveredCount,
        deceased: deceasedCount,
        active: confirmedCount - (recoveredCount + deceasedCount),
        tested: districtData.tested,
      }
      districtWiseData.push(districtTotalData)

      return null
    })

    const districtWiseConfirmed = []
    const districtWiseActive = []
    const districtWiseRecovered = []
    const districtWiseDeceased = []

    districtWiseData.map(eachDist => {
      const {districtName, confirmed, recovered, active, deceased} = eachDist

      const confirmedData = [confirmed, districtName]
      const activeData = [active, districtName]
      const recoveredData = [recovered, districtName]
      const deceasedData = [deceased, districtName]

      districtWiseConfirmed.push(confirmedData)
      districtWiseActive.push(activeData)
      districtWiseRecovered.push(recoveredData)
      districtWiseDeceased.push(deceasedData)

      return null
    })
    const districtWiseCasesTypes = [
      districtWiseConfirmed,
      districtWiseActive,
      districtWiseRecovered,
      districtWiseDeceased,
    ]
    districtWiseCasesTypes.map(eachType => {
      eachType.sort((a, b) => {
        if (a[0] > b[0]) {
          return 1
        }
        if (a[0] < b[0]) {
          return -1
        }
        return 0
      })

      return null
    })

    districtWiseCasesTypes.map(eachType => eachType.reverse())
    const casesTypes = {
      sortedConfirmed: districtWiseCasesTypes[0],
      sortedActive: districtWiseCasesTypes[1],
      sortedRecovered: districtWiseCasesTypes[2],
      sortedDeceased: districtWiseCasesTypes[3],
    }

    this.setState({
      stateTotalCasesList: {
        stateName: activeState.stateName,
        stateCode: activeState.stateCode,
        tested: data[id].total.tested,
        confirmed: data[id].total.confirmed,
        recovered: data[id].total.recovered,
        deceased: data[id].total.deceased,
        active:
          data[id].total.confirmed -
          data[id].total.recovered +
          data[id].total.deceased,
      },
      districtWiseCasesTypesSortedList: casesTypes,
      isLoading: false,
    })
  }

  onTopConfirmed = () => {
    this.setState({activeCaseType: caseTypesConstants.confirmed})
  }

  onTopActive = () => {
    this.setState({activeCaseType: caseTypesConstants.active})
  }

  onTopRecovered = () => {
    this.setState({activeCaseType: caseTypesConstants.recovered})
  }

  onTopDeceased = () => {
    this.setState({activeCaseType: caseTypesConstants.deceased})
  }

  renderCountryWideCasesData = () => {
    const {stateTotalCasesList, activeCaseType} = this.state
    const activeConfirmed =
      activeCaseType === caseTypesConstants.confirmed
        ? 'active-confirmed-case-type'
        : ''
    const activeActive =
      activeCaseType === caseTypesConstants.active
        ? 'active-active-case-type'
        : ''
    const activeRecovered =
      activeCaseType === caseTypesConstants.recovered
        ? 'active-recovered-case-type'
        : ''
    const activeDeceased =
      activeCaseType === caseTypesConstants.deceased
        ? 'active-deceased-case-type'
        : ''

    return (
      <div className="state-cases-details-list">
        <div
          data-testid="stateSpecificConfirmedCasesContainer"
          className={`state-cases-detail-item ${activeConfirmed}`}
        >
          <button
            type="button"
            onClick={this.onTopConfirmed}
            className="total-case-btn"
          >
            <p className="confirmed state-type-text">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1684647856/check-mark_1_gyahrd.png"
              alt="state specific confirmed cases pic"
              className="state-case-type-icon"
            />
            <p className="state-cases-count confirmed">
              {stateTotalCasesList.confirmed}
            </p>
          </button>
        </div>
        <div
          data-testid="stateSpecificActiveCasesContainer"
          className={`state-cases-detail-item ${activeActive}`}
        >
          <button
            type="button"
            onClick={this.onTopActive}
            className="total-case-btn"
          >
            <p className="state-type-text active">Active</p>
            <img
              src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1684647915/protection_1_ainxui.png"
              alt="state specific active cases pic"
              className="state-case-type-icon"
            />
            <p className="state-cases-count active">
              {stateTotalCasesList.active}
            </p>
          </button>
        </div>
        <div
          data-testid="stateSpecificRecoveredCasesContainer"
          className={`state-cases-detail-item ${activeRecovered}`}
        >
          <button
            type="button"
            onClick={this.onTopRecovered}
            className="total-case-btn"
          >
            <p className="state-type-text recovered">Recovered</p>
            <img
              src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1685943571/recovered_1_tolyoa.png"
              alt="state specific recovered cases pic"
              className="state-case-type-icon"
            />
            <p className="state-cases-count recovered">
              {stateTotalCasesList.recovered}
            </p>
          </button>
        </div>
        <div
          data-testid="stateSpecificDeceasedCasesContainer"
          className={`state-cases-detail-item ${activeDeceased}`}
        >
          <button
            type="button"
            onClick={this.onTopDeceased}
            className="total-case-btn"
          >
            <p className="type-text deceased">Deceased</p>
            <img
              src="https://res.cloudinary.com/dr0j4gxol/image/upload/v1684647897/Outline_nzzgj7.png"
              alt="state specific deceased cases pic"
              className="state-case-type-icon"
            />
            <p className="state-cases-count deceased">
              {stateTotalCasesList.deceased}
            </p>
          </button>
        </div>
      </div>
    )
  }

  renderTopDistrictsCasesType = () => {
    const {
      districtWiseCasesTypesSortedList,
      dateWiseBarChartCasesTypes,
      activeCaseType,
    } = this.state

    const activeCaseTypeDetails = topDistrictsConstants[activeCaseType]
    const {color, listType, type} = activeCaseTypeDetails

    return (
      <div>
        <h1 className={`${type} top`}>Top Districts</h1>
        <ul
          className="top-districts-list"
          data-testid="topDistrictsUnorderedList"
        >
          {districtWiseCasesTypesSortedList[listType].map(eachCase => {
            const casesCount = eachCase[0]
            const districtName = eachCase[1]

            return (
              <li className="district-item" key={districtName}>
                <p className="district-cases-count">{casesCount}</p>
                <p className="district-name">{districtName}</p>
              </li>
            )
          })}
        </ul>
        <BarChart
          data={dateWiseBarChartCasesTypes[type]}
          className="bar-chart-desktop"
          width={1200}
          height={450}
          barCategoryGap="23%"
          margin={{top: 30, right: 15, bottom: 30, left: 15}}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{fill: color, fontSize: 15}}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            fill={color}
            className="bar"
            label={{
              position: 'top',
              fill: color,
              fontSize: 12,
            }}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>

        <BarChart
          data={dateWiseBarChartCasesTypes[type]}
          className="bar-chart-mobile"
          width={330}
          height={250}
          barCategoryGap="10%"
          margin={{top: 30}}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{fill: color, fontSize: 8}}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            fill={color}
            className="bar"
            label={{
              position: 'top',
              fill: color,
              fontSize: 4,
            }}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  renderCovidDailySpreadTrends = () => {
    const {dateWiseLineChartCasesTypes} = this.state

    return (
      <div>
        <h1 className="daily-spread-heading">Daily Spread Trends</h1>
        <ul className="line-charts-container" data-testid="lineChartsContainer">
          {covidDailySpreadConstants.map(eachType => {
            const {color, className, type, typeCountValue} = eachType

            return (
              <li key={type}>
                <div className={`line-chart-desktop ${className}`}>
                  <LineChart
                    data={dateWiseLineChartCasesTypes[type]}
                    height={350}
                    width={1150}
                  >
                    <Legend verticalAlign="top" align="right" />
                    <XAxis
                      dataKey="date"
                      tick={{fill: color, fontSize: 12}}
                      tickSize={15}
                      interval={7}
                      stroke={color}
                      strokeWidth={2}
                      tickMargin={6}
                    />
                    <YAxis
                      tick={{fill: color, fontSize: 12}}
                      tickSize={15}
                      stroke={color}
                      strokeWidth={2}
                      interval={0}
                    />
                    <Line
                      type="monotone"
                      dataKey={typeCountValue}
                      stroke={color}
                      dot={{stroke: color, strokeWidth: 3}}
                      strokeWidth={2}
                    />
                  </LineChart>
                </div>
                <div className={`line-chart-mobile ${className}`}>
                  <LineChart
                    data={dateWiseLineChartCasesTypes[type]}
                    height={200}
                    width={320}
                    margin={{left: 0, top: 20, right: 5, bottom: 10}}
                  >
                    <Legend verticalAlign="top" align="right" />
                    <XAxis
                      dataKey="date"
                      tick={{fill: color, fontSize: 8}}
                      tickSize={5}
                      interval={12}
                      stroke={color}
                      strokeWidth={1}
                      tickMargin={4}
                    />
                    <YAxis
                      tick={{fill: color, fontSize: 12}}
                      tickSize={5}
                      stroke={color}
                      strokeWidth={1}
                      interval={0}
                    />
                    <Line
                      type="monotone"
                      dataKey={typeCountValue}
                      stroke={color}
                      dot={{stroke: color, strokeWidth: 3}}
                      strokeWidth={1}
                    />
                  </LineChart>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {stateTotalCasesList, isLoading, isTimeLineDataLoading} = this.state

    return (
      <div>
        <Header />
        {isLoading ? (
          <Loading testId="stateDetailsLoader" />
        ) : (
          <div className="state-specific-container">
            <div className="state-name-tested">
              <h1 className="state-specific-state-name">
                {stateTotalCasesList.stateName}
              </h1>
              <div>
                <p className="tested">Tested</p>
                <p className="tested-count">{stateTotalCasesList.tested}</p>
              </div>
            </div>
            <p className="last-updated">last updated on march 28th 2021.</p>
            {this.renderCountryWideCasesData()}
            {isTimeLineDataLoading ? (
              <Loading testId="timelinesDataLoader" />
            ) : (
              <>
                {this.renderTopDistrictsCasesType()}
                {this.renderCovidDailySpreadTrends()}
              </>
            )}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}

export default StateSpecific
