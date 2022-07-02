import React from "react";
import {
  AnalyticalTable,
  FlexBox,
  Button,
  Badge,
} from "@ui5/webcomponents-react";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

import Amplify, { API } from "aws-amplify";
import { deleteTransaction } from "../graphql/mutations";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function TransactionTable({
  transactionsData,
  setTransactions,
  setFormState,
  setTransactionDialogState,
}) {
  const i18nBundle = useI18nBundle("myApp");

  const onEditTransaction = (row) => {
    setFormState(transactionsData[row.index]);
    setTransactionDialogState(true);
  };

  async function onDeleteTransaction(rowIndex) {
    try {
      const transactionId = transactionsData[rowIndex].id;

      await API.graphql({
        query: deleteTransaction,
        variables: {
          input: { id: transactionId, date: transactionsData[rowIndex].date },
        },
      });
      setTransactions(
        transactionsData.filter((item) => item.id !== transactionId)
      );
    } catch (err) {
      console.log("error deleting Transaction:", err);
    }
  }

  const columns = [
    {
      Header: i18nBundle.getText("transactionDate"),
      accessor: "date",
      Cell: (instance) => {
        const newDate = new Date(instance.cell.value + "T00:00:00");
        const options = { month: "short", day: "numeric", year: "numeric" };
        return newDate.toLocaleDateString(navigator.language, options);
      },
    },
    {
      Header: i18nBundle.getText("transactionPayee"),
      accessor: "payee",
    },
    {
      Header: i18nBundle.getText("transactionCategory"),
      accessor: "category",
    },
    {
      Header: i18nBundle.getText("transactionPaymentMethod"),
      accessor: "paymentMethod",
    },
    {
      Header: i18nBundle.getText("transactionCashFlow"),
      accessor: "cashFlow",
      Cell: (instance) => {
        return (
          <Badge colorScheme={instance.cell.value === "debit" ? "3" : "6"}>
            {instance.cell.value}
          </Badge>
        );
      },
    },
    {
      Header: i18nBundle.getText("transactionAmount"),
      accessor: "amount",
      Cell: (instance) => {
        const options = {
          style: "decimal",
          maximumFractionDigits: "2",
          minimumFractionDigits: "2",
        };
        return instance.cell.value.toLocaleString(navigator.language, options);
      },
    },
    {
      id: "actions",
      Header: i18nBundle.getText("actions"),
      width: 100,
      disableResizing: true,
      Cell: (instance) => {
        return (
          <FlexBox>
            <Button
              design="Transparent"
              icon="edit"
              onClick={(e) => {
                e.markerAllowTableRowSelection = true;
                onEditTransaction(instance.row);
              }}
            />
            <Button
              design="Transparent"
              icon="delete"
              style={{ color: "red" }}
              onClick={(e) => {
                e.markerAllowTableRowSelection = true;
                onDeleteTransaction(instance.row.index);
              }}
            />
          </FlexBox>
        );
      },
    },
  ];

  return (
    <AnalyticalTable
      infiniteScroll="true"
      infiniteScrollThreshold="10"
      minRows="10"
      sortable="true"
      filterable="true"
      visibleRows="10"
      columns={columns}
      data={transactionsData}
    />
  );
}

export default TransactionTable;
