import Link from 'next/link';
import styled from 'styled-components';

function Error({ statusCode }: { statusCode: number }) {
  return (
    <Main>
      <H1>
        <ErrorWrapper>{statusCode}</ErrorWrapper>
        <MessageWrapper>Page not found</MessageWrapper>
      </H1>
      <P>Something went wrong. Maybe try returning to the front page?</P>
      <ReturnLink href="/">Go to front page</ReturnLink>
    </Main>
  );
}

const Main = styled.main`
  min-height: 80vh;
  height: 100%;
  padding: var(--page-padding);

  grid-column: span 2;
  justify-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin-top: var(--page-padding);
    font-size: 1.5rem;
    text-align: center;
  }
`;

const ErrorWrapper = styled.span`
  @media (min-width: 60rem) {
    :after {
      content: ' - ';
    }
  }
  @media (max-width: 60rem) {
    display: block;
    font-size: 6rem;
    line-height: 1em;
  }
`;

const MessageWrapper = styled.span``;

const H1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;

  @media (max-width: 40rem) {
    font-size: 3rem;
  }
`;

const P = styled.p``;

const ReturnLink = styled(Link)``;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
