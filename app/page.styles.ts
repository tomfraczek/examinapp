import styled from "styled-components";
import { color } from "./theme";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0.5rem;
  background-color: ${color.mainDark};
`;
