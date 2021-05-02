import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  padding: 32px 0;
  background: var(--gray-850);
`;

export const HeaderContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    line-height: 24px;

    > span {
      color: var(--white);
      font-size: 1.5rem;
      margin-bottom: 3px;

    }

    > strong {
      color: var(--yellow-500);
      font-size: 1.1rem;
    }
  }
`;
