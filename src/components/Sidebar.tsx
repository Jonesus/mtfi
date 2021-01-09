import { CommonData, LanguageCode, PageRoute, PageTemplate } from 'api/types';
import { LanguagePicker } from 'components/LanguagePicker';
import { MainTitle } from 'components/MainTitle';
import Link from 'next/link';
import { AiOutlineMail, AiOutlinePhone, AiOutlineSend } from 'react-icons/ai';
import styled from 'styled-components';

type SidebarProps = {
  commonData: CommonData;
  language: LanguageCode;
  pageRoutes: PageRoute[];
  currentPage: PageTemplate;
};

export const Sidebar: React.FC<SidebarProps> = ({
  commonData,
  language,
  pageRoutes,
  currentPage,
}) => {
  const frontPageRoute = pageRoutes.find((route) => route.template === 'front') as PageRoute;
  const restPageRoutes = pageRoutes.filter(
    (route) =>
      route.template !== 'front' && route.translations[language].slug.split('/').length === 1
  );
  const currentRoute = pageRoutes.find((route) => route.template === currentPage);

  return (
    <SidebarWrapper>
      <DesktopTitle
        frontPage={currentPage === 'front'}
        title={commonData.translations[language].title}
        subtitle={commonData.translations[language].subtitle}
        link={frontPageRoute.translations[language].slug}
      />

      <Navigation>
        <LinkList>
          {restPageRoutes.map((route) => (
            <LinkListItem key={route.template}>
              <Link href={route.translations[language].slug} passHref>
                <NavLink className={currentPage === route.template ? 'current' : ''}>
                  {route.translations[language].navigation_title}
                </NavLink>
              </Link>
            </LinkListItem>
          ))}
        </LinkList>
      </Navigation>

      <div>
        <Contacts>
          <ContactInfo href={`tel:${commonData.phone_number}`}>
            <PhoneIcon /> {commonData.phone_number}
          </ContactInfo>
          <ContactInfo href={`mailto:${commonData.email_address}`}>
            <MailIcon /> {commonData.email_address}
          </ContactInfo>
          <ContactInfo href={`https://t.me/${commonData.telegram_nickname.replace('@', '')}`}>
            <SendIcon /> {commonData.telegram_nickname}
          </ContactInfo>
        </Contacts>
        <StyledLanguagePicker
          route={currentRoute}
          currentLanguage={language}
          commonData={commonData}
        />
      </div>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--page-padding) 0 var(--page-padding) var(--page-padding);

  @media (max-width: 60rem) {
    padding: 1rem var(--page-padding);
    position: absolute;
    bottom: 0;
    z-index: 1;
    background-color: var(--background-dark);
    border-top: 1px solid var(--black);
    width: 100%;

    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const DesktopTitle = styled(MainTitle)`
  @media (max-width: 60rem) {
    display: none;
  }
`;

const Navigation = styled.nav``;

const LinkList = styled.ul`
  padding-left: 1em;
  border-left: 1px solid var(--black);

  @media (max-width: 60rem) {
    padding: 0;
    border: none;
    display: flex;
    justify-content: space-between;
  }
`;

const LinkListItem = styled.li`
  font-size: 2em;
  font-weight: 300;

  & + & {
    margin-top: 1em;
  }

  @media (max-width: 60rem) {
    & + & {
      margin: 0;
    }
    font-weight: 400;
  }

  @media (max-width: 40rem) {
    font-size: 1.5em;
  }
`;

const Contacts = styled.address`
  font-style: normal;

  @media (max-width: 60rem) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: var(--black);

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 50%;
    position: absolute;
    background: var(--black);
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:not(.current):active:after,
  &:not(.current):hover:after {
    width: 100%;
    left: 0;
  }
  &.current {
    font-weight: 700;
  }
`;

const ContactInfo = styled.a`
  display: inline-flex;
  align-items: center;

  font-size: 1.125em;
  color: var(--gray);
  text-decoration: none;

  --icon-size: 1.2em;

  & + & {
    margin-top: 1em;
  }

  & > svg {
    width: var(--icon-size);
    height: var(--icon-size);
    margin-right: 1em;
  }
`;

const MailIcon = styled(AiOutlineMail)``;

const SendIcon = styled(AiOutlineSend)`
  transform: rotate(-45deg);
`;

const PhoneIcon = styled(AiOutlinePhone)`
  transform: rotate(90deg);
`;

const StyledLanguagePicker = styled(LanguagePicker)`
  margin-top: 1.5em;
  @media (max-width: 60rem) {
    margin-top: 0.5em;
  }
`;
