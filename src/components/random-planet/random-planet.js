import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }

  constructor() {
    super();
    this.updatePlanet();
    setInterval(this.updatePlanet, 1500);
  };

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError);
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  render() {

    const { planet, loading, error } = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading && !error ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>

    );
  }
}

const PlanetView = ({ planet }) => {

  const { population, rotationPeriod, diameter, name, id } = planet;

  return (<React.Fragment>
    <img className="planet-image"
      src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
    <div>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{population}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation Period</span>
          <span>{rotationPeriod}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{diameter}</span>
        </li>
      </ul>
    </div>
  </React.Fragment>
  );
};
