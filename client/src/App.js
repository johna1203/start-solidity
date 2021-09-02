import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, input: '0' };

  componentDidMount = async () => {
    try {

      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();


      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.get().call();
    this.setState({ storageValue: response });
  };

  handleSetButton = async () => {
    const { accounts, contract, input } = this.state;
    const tx = await contract.methods.set(input).send({
      from: accounts[0]
    });

    console.log(tx);


    this.runExample();
  }

  handleAddButton = async () => {
    const { accounts, contract, input } = this.state;
    const tx = await contract.methods.add(input).send({
      from: accounts[0]
    });
    this.runExample();
  }

  handleInputAmount = async (event)=> {
    this.setState({input: event.target.value});
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>The stored value is: {this.state.storageValue}</h1>
        <input onChange={this.handleInputAmount} value={this.state.input} />
        <button onClick={this.handleSetButton}>Set</button>
        <button onClick={this.handleAddButton}>Add</button>
      </div>
    );
  }
}

export default App;
