import { regular, regularRadius } from '@/app/theme/border';
import { lightBlack } from '@/app/theme/color';
import styled from 'styled-components';

export const SignInFormContainer = styled.div`
  width: 400px;
  padding: 20px;
  border: ${regular};
  border-radius: ${regularRadius};
  background-color: ${lightBlack};
`;

export const Header = styled.h2`
  margin-bottom: 25px;
`;

export const CtaContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;
