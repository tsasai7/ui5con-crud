import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  ResponsiveGridLayout,
  Icon,
} from "@ui5/webcomponents-react";
import { useI18nBundle } from "@ui5/webcomponents-react-base";

function BalanceBox({ transactions }) {
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [balance, setBalance] = useState(0);

  const i18nBundle = useI18nBundle("myApp");

  useEffect(() => {
    setBalance(totalCredit - totalDebit);
  }, [totalCredit, totalDebit]);

  useEffect(() => {
    if (transactions.length !== 0) {
      const queryTotalDebit = transactions.filter(
        (item) => item.cashFlow === "debit"
      );

      if (queryTotalDebit.length !== 0) {
        setTotalDebit(
          queryTotalDebit
            .map((transaction) => transaction.amount)
            .reduce((total, amount) => total + amount)
        );
      }

      const queryTotalCredit = transactions.filter(
        (item) => item.cashFlow === "credit"
      );

      if (queryTotalCredit.length !== 0) {
        setTotalCredit(
          queryTotalCredit
            .map((transaction) => transaction.amount)
            .reduce((total, amount) => total + amount)
        );
      }
    } else {
      setTotalCredit(0);
      setTotalDebit(0);
    }
  }, [transactions]);

  return (
    <ResponsiveGridLayout
      columnGap="1rem"
      rowGap="1rem"
      columnSpanL="3"
      columnSpanM="3"
      columnSpanS="2"
      columnSpanXL="4"
    >
      <Card
        key="credit"
        header={
          <CardHeader
            avatar={<Icon name="sys-add" style={{ color: "blue" }} />}
            interactive="false"
            titleText={totalCredit.toLocaleString(navigator.language, {
              style: "decimal",
              maximumFractionDigits: "2",
              minimumFractionDigits: "2",
            })}
            subtitleText={i18nBundle.getText("totalCredit")}
          />
        }
      />
      <Card
        key="debit"
        header={
          <CardHeader
            avatar={<Icon name="sys-minus" style={{ color: "red" }} />}
            interactive="false"
            titleText={totalDebit.toLocaleString(navigator.language, {
              style: "decimal",
              maximumFractionDigits: "2",
              minimumFractionDigits: "2",
            })}
            subtitleText={i18nBundle.getText("totalDebit")}
          />
        }
      />
      <Card
        key="balance"
        header={
          <CardHeader
            avatar={<Icon name="lead" style={{ color: "black" }} />}
            interactive="false"
            titleText={balance.toLocaleString(navigator.language, {
              style: "decimal",
              maximumFractionDigits: "2",
              minimumFractionDigits: "2",
            })}
            subtitleText={i18nBundle.getText("totalBalance")}
          />
        }
      />
    </ResponsiveGridLayout>
  );
}

export default BalanceBox;
