import React from "react";
import { Container } from "@nextui-org/react";

export default function Main({ children }) {
  return (
    <React.Fragment>
      <Container>{children}</Container>
    </React.Fragment>
  );
}
