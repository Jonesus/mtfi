import { CommonData, LanguageCode, PageRoute } from 'api/types';
import Link from 'next/link';
import styled from 'styled-components';

type LanguagePickerProps = {
  route?: PageRoute;
  currentLanguage: LanguageCode;
  commonData: CommonData;
};

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  route,
  currentLanguage,
  commonData,
  ...rest
}) =>
  route ? (
    <ListWrapper {...rest}>
      <LanguageList>
        {Object.entries(route.translations).map((entry) => (
          <ListItem key={entry[0]}>
            <Link href={entry[1].slug} passHref>
              <LanguageLink className={entry[0] === currentLanguage ? 'current' : ''}>
                {commonData.translations[entry[0] as LanguageCode].language_switcher_label}
              </LanguageLink>
            </Link>
          </ListItem>
        ))}
      </LanguageList>
    </ListWrapper>
  ) : null;

const ListWrapper = styled.nav`
  --link-padding: 1em;

  @media (min-width: 60rem) {
    margin-left: calc(-1 * var(--link-padding));
  }
`;

const LanguageList = styled.ul`
  display: flex;
  @media (max-width: 60rem) {
    justify-content: center;
  }
`;

const ListItem = styled.li``;

const LanguageLink = styled.a`
  padding: var(--link-padding);
  color: var(--gray);
  text-decoration: none;

  &.current {
    text-decoration: underline;
  }

  @media (max-width: 60rem) {
    padding-bottom: 0;
  }
`;
