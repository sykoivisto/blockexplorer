import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import Transactions from "./components/Transactions";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState({});
  const [showTransactions, setShowTransactions] = useState(false);

  const onShowTransactions = () => {
    setShowTransactions(true);
  }

  useEffect(() => {
    async function getBlockWithTransactions() {
      setBlockInfo(await alchemy.core.getBlockWithTransactions(blockNumber));
    }

    getBlockWithTransactions();

    setShowTransactions(false)
  }, [blockNumber]);

  useEffect(() => {
    console.log(blockInfo);
  }, [blockInfo]);

  return (
    <div className="App">
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <span className="fs-4">BlockExplorer</span>
          </a>
          <form
            className="col-12 col-md-6 mb-3 mb-md-0"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setBlockNumber(Number(e.target[0].value));
              e.target[0].value = "";
            }}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search a Block Number..."
              aria-label="Search a Block Number "
            />
          </form>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <h3>Block #{blockInfo.number}</h3>
        </div>
        <div className="row">
          <div className="col">
            <p>Timestamp:</p>
          </div>
          <div className="col">
            {blockInfo.timestamp
              ? new Date(blockInfo.timestamp * 1000).toLocaleString()
              : null}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Transactions:</p>
          </div>
          <div className="col">
            <a href="#" onClick={() => onShowTransactions()}>
              {blockInfo.transactions ? blockInfo.transactions.length : null}{" "}
            </a>
            transactions in this block
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Difficulty:</p>
          </div>
          <div className="col">
            <p>{blockInfo.difficulty}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Gas Limit:</p>
          </div>
          <div className="col">
            <p>
              {blockInfo.gasLimit
                ? blockInfo.gasLimit.toNumber().toLocaleString()
                : null}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Gas Used:</p>
          </div>
          <div className="col">
            <p>
              {blockInfo.gasUsed
                ? blockInfo.gasUsed.toNumber().toLocaleString()
                : null}
            </p>
          </div>
        </div>

        <Transactions show={showTransactions} transactions={blockInfo.transactions}></Transactions>
      </div>
    </div>
  );
}

export default App;
