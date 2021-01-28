import React from "react";
import ReactLoading from "react-loading";
import Widget from "../Widget";

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <ReactLoading type="spin" height="100%" width="100%" color="#707070" />
      </Widget.Content>
    </Widget>
  );
}
