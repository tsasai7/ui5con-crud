import React, { useState, useEffect } from "react";
import { Panel, Bar, Button, Title } from "@ui5/webcomponents-react";
import TransactionDialog from "./TransactionDialog";
import TransactionTable from "./TransactionTable";
import BalanceBox from "./BalanceBox";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTransactions } from "../graphql/queries";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

const initialState = {
  date: new Date().toISOString().split("T")[0],
  payee: "",
  category: "",
  paymentMethod: "",
  cashFlow: "",
  amount: "",
  comment: "",
};

export default function Transactions() {
  const [formState, setFormState] = useState(initialState);
  const [transactionDialogState, setTransactionDialogState] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const i18nBundle = useI18nBundle("myApp");

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const transactionData = await API.graphql(
        graphqlOperation(listTransactions)
      );

      let transactionsResult = transactionData.data.listTransactions.items;
      transactionsResult.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      transactionsResult.sort((a, b) => new Date(a.date) - new Date(b.date));

      setTransactions(transactionsResult);
    } catch (err) {
      console.log("error fetching Transactions");
    }
  }

  const onNewTransactionClick = () => {
    setFormState(initialState);
    setTransactionDialogState(true);
  };

  return (
    <>
      <BalanceBox transactions={transactions} />
      <p />
      <Panel
        fixed="true"
        style={{ width: "100%" }}
        header={
          <Bar
            startContent={
              <Title>{i18nBundle.getText("transactionList")}</Title>
            }
            endContent={
              <Button onClick={onNewTransactionClick}>
                {" "}
                {i18nBundle.getText("newTransactionButton")}
              </Button>
            }
          />
        }
      >
        <TransactionTable
          transactionsData={transactions}
          setTransactions={setTransactions}
          setFormState={setFormState}
          setTransactionDialogState={setTransactionDialogState}
        />
        <TransactionDialog
          formState={formState}
          setFormState={setFormState}
          transactionDialogState={transactionDialogState}
          setTransactionDialogState={setTransactionDialogState}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </Panel>
    </>
  );
}
