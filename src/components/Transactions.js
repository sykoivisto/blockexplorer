import React from "react";

export default function Transactions({ show, transactions }) {
  if (!show) {
    return <></>;
  }

  return (
    <div>
        <h3>Transactions</h3>
        {transactions.map(tx => {
            return <p key={tx.hash}><a href="">{tx.hash.slice(20)}...</a></p>
        })}
    </div>
  )
}
