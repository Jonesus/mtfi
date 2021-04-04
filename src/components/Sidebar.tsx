import { useAppContext } from 'api/context';
import { PageRoute, PageTemplate } from 'api/types';
import { LanguagePicker } from 'components/LanguagePicker';
import { MainTitle } from 'components/MainTitle';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { AiOutlineInstagram, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import styled from 'styled-components';
import { containerTransitions, itemTransitions, prefixWithSlash } from 'utils';

type SidebarProps = {
  pageRoutes: PageRoute[];
  currentPage: PageTemplate;
};

export const Sidebar: React.FC<SidebarProps> = ({ pageRoutes, currentPage }) => {
  const { language, commonData, pageId } = useAppContext();
  const frontPageRoute = pageRoutes.find((route) => route.template === 'front') as PageRoute;
  const restPageRoutes = pageRoutes.filter(
    (route) =>
      route.template !== 'front' && route.translations[language].slug.split('/').length === 1
  );
  const currentRoute = pageRoutes.find(
    (route) => route.template === currentPage && route.id === pageId
  );
  console.log(pageId);
  console.log(pageRoutes);

  return (
    <AnimatePresence exitBeforeEnter>
      {currentPage === 'lightbox' ? (
        <motion.div
          key="placeholder"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={containerTransitions}
        />
      ) : (
        <SidebarWrapper
          initial="initial"
          animate="enter"
          exit="exit"
          variants={containerTransitions}
          key="content"
        >
          <DesktopTitle
            frontPage={currentPage === 'front'}
            title={commonData.translations[language].title}
            subtitle={commonData.translations[language].subtitle}
            link={prefixWithSlash(frontPageRoute.translations[language].slug)}
            variants={itemTransitions}
            key="title"
          />

          <Navigation variants={itemTransitions} key="nav">
            <LinkList>
              {restPageRoutes.map((route) => (
                <LinkListItem key={route.template}>
                  <Link href={prefixWithSlash(route.translations[language].slug)} passHref>
                    <NavLink className={currentPage === route.template ? 'current' : ''}>
                      {route.translations[language].navigation_title}
                    </NavLink>
                  </Link>
                </LinkListItem>
              ))}
            </LinkList>
          </Navigation>

          <motion.div variants={itemTransitions} key="contacts">
            <Contacts>
              <ContactInfo href={`tel:${commonData.phone_number}`}>
                <PhoneIcon /> {commonData.phone_number}
              </ContactInfo>
              <ContactInfo href={`mailto:${commonData.email_address}`}>
                <MailIcon /> {commonData.email_address}
              </ContactInfo>
              <ContactInfo
                href={`https://www.instagram.com/${commonData.instagram_user.replace('@', '')}/`}
              >
                <InstagramIcon /> {commonData.instagram_user}
              </ContactInfo>
            </Contacts>
            <StyledLanguagePicker route={currentRoute} />
          </motion.div>
        </SidebarWrapper>
      )}
    </AnimatePresence>
  );
};

const SidebarWrapper = styled(motion.header)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--page-padding) 0 var(--page-padding) var(--page-padding);

  transition: transform 0.5s cubic-bezier(0.5, 1, 0.89, 1);

  @media (max-width: 60rem) {
    padding: 1rem var(--page-padding);
    position: fixed;
    bottom: 0;
    z-index: 1;
    background-color: var(--background-dark);
    border-top: 1px solid var(--black);
    width: 100%;

    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    transform: translateY(var(--header-position, 0px));
  }
`;

const DesktopTitle = motion.custom(styled(MainTitle)`
  @media (max-width: 60rem) {
    display: none;
  }
`);

const Navigation = styled(motion.nav)``;

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

  @media (max-width: 25rem) {
    font-size: 1.2em;
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
  transition: font-weight 0.3s ease-in-out;

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

const InstagramIcon = styled(AiOutlineInstagram)``;

const PhoneIcon = styled(AiOutlinePhone)`
  transform: rotate(90deg);
`;

const StyledLanguagePicker = styled(LanguagePicker)`
  margin-top: 1.5em;
  @media (max-width: 60rem) {
    margin-top: 0.5em;
  }
`;
