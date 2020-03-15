import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

export default class Search extends React.Component {
    constructor() {
        super()


        this.state = {
            loginState: true,
            itemDetails: [],
            searchAttempts: 0,
            error: "Maximum Search Attempts Reached. Try After 1 Minute",
            username: localStorage.getItem('username')
        }
    }

    componentDidMount() {
        if (this.state.username == null) {
            this.setState({ loginState: false })
        }
        setInterval(() => {
            this.setState({ searchAttempts: 0 })
        }, 60000)

        fetch("https://swapi.co/api/planets/")
            .then(res => res.json())
            .then(fetchedData => this.setState({ itemDetails: fetchedData.results, dataDetails: fetchedData.results }))
    }

    logout() {
        localStorage.clear()
        this.setState({ loginState: false })
        this.render()
    }

    searchChange = (event) => {
        if (this.state.username !== "Luke Skywalker") {
            if (this.state.searchAttempts <= 15) {
                this.setState({
                    searchAttempts: this.state.searchAttempts + 1,
                    itemDetails: this.state.dataDetails.filter((pro) => {
                        return pro.name.toLowerCase().includes(event.target.value.toLowerCase())
                    })
                })
            } else {
                alert(this.state.error)
            }
        } else {
            this.setState({
                itemDetails: this.state.dataDetails.filter((pro) => {
                    return pro.name.toLowerCase().includes(event.target.value.toLowerCase())
                })
            })
        }
    }


    render() {

        if (this.state.loginState === false) {
            return <Redirect to="/"></Redirect>
        }

        const DisplayCard = () => this.state.itemDetails.map(item => {
            return <div onClick={() => this.newClick(item.name)}>
                <li className="results__items">
                    <h3 className="results__title"  >
                        {item.name}
                    </h3>
                    <ul className="results__info" style={{ fontSize: (item.population.length) * 2 }}>
                        <li>Terrain :  <span>{item.terrain}</span> </li>
                        <li>Gravity :  <span>{item.gravity}</span> </li>
                        <li>Rotation Period :  <span>{item.rotation_period}</span> </li>
                        <li>Surface Water :  <span>{item.surface_water}</span> </li>
                        <li>Orbital Period :  <span>{item.orbital_period}</span> </li>
                        <li>Population :  <span>{item.population}</span> </li>
                    </ul>
                </li>
            </div>
        })

        return (
            <div>
                <div className="header">
                    <div className="searchBar">
                        <Input fluid icon="search" size="big" placeholder='Search...' onChange={this.searchChange} />
                    </div>
                    <div className="logout">
                        <h3 >Hi {this.state.username} </h3><br />
                        <Button color="red" onClick={() => this.logout()}>Logout</Button>
                    </div>

                </div>
                <div className="resultdiv">
                    <DisplayCard />
                </div>

            </div>
        )
    }
}