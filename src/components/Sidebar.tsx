import { CommonData, LanguageCode } from 'api/types';
import { MainTitle } from 'components/MainTitle';
import { AiOutlineMail, AiOutlinePhone, AiOutlineSend } from 'react-icons/ai';
import styled from 'styled-components';

type SidebarProps = {
  commonData: CommonData;
  language: LanguageCode;
  frontPage?: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ commonData, language, frontPage }) => (
  <SidebarWrapper>
    <DesktopTitle frontPage={frontPage} {...commonData.translations[language]} />

    <Navigation>
      <LinkList>
        <LinkListItem>About</LinkListItem>
        <LinkListItem>Work</LinkListItem>
        <LinkListItem>Contact</LinkListItem>
      </LinkList>
    </Navigation>

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
  </SidebarWrapper>
);

const SidebarWrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--page-padding) 0 var(--page-padding) var(--page-padding);

  @media (max-width: 60rem) {
    padding: 1rem;
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
    padding: none;
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
