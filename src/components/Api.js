import React, { Component } from 'react';

export default class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { arrayDolar: [], real: 1 }

    this.handleChangeReal = this.handleChangeReal.bind(this)
  }

  handleChangeReal = (event) => {
    this.setState({ real: event.target.value });
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/USD/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ arrayDolar: responseJson })
        this.setState({ dolar: this.state.arrayDolar[0].high })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  calcular = () => {
    this.setState({ dolar: this.state.arrayDolar[0].high * this.state.real })
  }

  render() {
    return (
      <div class="box">
        <h2 class="center">Valor do dolar: </h2>
        {this.state.arrayDolar.map(valor =>
          <p>R$ {valor.high}
          </p>)}
        <h4>Data/Hora da ultima cotação: </h4>
        {this.state.arrayDolar.map(valor =>
          <p>{valor.create_date}
          </p>)}
        <div class="calc">
          <h4>Converter</h4>
          <p><b>De:</b> dolar <b>Para:</b> real</p>
          <div>
            <t> $ </t>
            <input id="input" type="text" onChange={this.handleChangeReal.bind(this)} value={this.state.real} />
            &nbsp;&nbsp;&nbsp;
            <t> R$ </t>
            <input id="input" type="text" readOnly value={this.state.dolar} />
          </div>
          <div class="button">
            <button id="button" onClick={this.calcular}>Calcular</button>
          </div>
        </div>
      </div>
    );
  }
}

