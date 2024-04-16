import { color } from "@/app/theme";
import { regular, regularRadius } from "@/app/theme/border";
import { lightBlack } from "@/app/theme/color";
import styled from "styled-components";

// export const SignInFormContainer = styled.div`
//   width: 384px;
//   padding: 20px;
//   border: ${regular};
//   border-radius: ${regularRadius};
//   background-color: ${lightBlack};
// `;

export const LogoContainer = styled.div`
  flex: 0 1 auto;
  margin-bottom: 2.5rem; /* Assuming 10 in Tailwind corresponds to 2.5rem */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.h2`
  margin-bottom: 25px;
  color: ${color.white};
`;

export const CtaContainer = styled.div`
  border: 1px solid #2d3748;
  background-color: #1a202c;
  width: 24rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  background-color: ${color.secondDark};
`;

export const TextWhite = styled.p`
  color: ${color.white};
`;

export const SignInWithEmailContainer = styled.div`
  border: 1px solid ${color.mainBorder};
  background-color: ${color.secondDark};
  padding: 1.25rem;
  margin-top: 1rem;
  width: 24rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
`;

export const RegisterContainer = styled(SignInWithEmailContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
