import { sendContactRequest } from 'api';
import { useAppContext } from 'api/context';
import { ContactPageData, ContactRequestPayload } from 'api/types';
import { Main as OriginalMain } from 'components/Main';
import { PageTitle } from 'components/PageTitle';
import { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import { useState } from 'react';

type ContactPageProps = {
  data: ContactPageData;
};

export const ContactPage: NextPage<ContactPageProps> = ({ data }) => {
  const { language } = useAppContext();
  const { register, handleSubmit, errors, reset } = useForm({ mode: 'onTouched' });
  const [submitStatus, setSubmitStatus] = useState<'none' | 'success' | 'error'>('none');

  const onFocus = () => {
    if (submitStatus !== 'none') setSubmitStatus('none');
  };

  const onSubmit = async (data: ContactRequestPayload) => {
    try {
      const response = await sendContactRequest(data);
      if (response?.data?.id) {
        setSubmitStatus('success');
        reset();
      } else setSubmitStatus('error');
    } catch (e) {
      setSubmitStatus('error');
    }
  };

  return (
    <Main>
      <ContactPageWrapper>
        <PageTitle>{data.translations[language].title}</PageTitle>
        <ReactMarkdown skipHtml>{data.translations[language].text}</ReactMarkdown>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper>
            <InputLabel htmlFor="email">{data.translations[language].email_field_label}</InputLabel>
            <EmailInput
              name="email"
              id="email"
              onFocus={onFocus}
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && errors.email.type === 'required' && (
              <FormError>
                <WarningIcon />
                {data.translations[language].form_field_empty}
              </FormError>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <FormError>
                <WarningIcon />
                {data.translations[language].form_email_invalid}
              </FormError>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <InputLabel htmlFor="text">{data.translations[language].text_field_label}</InputLabel>
            <TextInput
              name="text"
              id="text"
              onFocus={onFocus}
              ref={register({
                required: true,
              })}
            />
            {errors.text && errors.text.type === 'required' && (
              <FormError>
                <WarningIcon />
                {data.translations[language].form_field_empty}
              </FormError>
            )}
          </FieldWrapper>

          <SubmitButton type="submit" disabled={!!errors.email || !!errors.text}>
            {data.translations[language].submit_button_text}
          </SubmitButton>

          {submitStatus === 'success' && (
            <FormSubmitSuccess>
              <SuccessIcon />
              {data.translations[language].form_submit_success}
            </FormSubmitSuccess>
          )}
          {submitStatus === 'error' && (
            <FormSubmitError>
              <WarningIcon />
              {data.translations[language].form_submit_error}
            </FormSubmitError>
          )}
        </Form>
      </ContactPageWrapper>
    </Main>
  );
};

const Main = styled(OriginalMain)`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  --element-margin: 2rem;
  --icon-size: 1.3em;
`;

const ContactPageWrapper = styled.article`
  width: 100%;
  max-width: var(--max-text-width);
  padding: var(--page-padding);
  padding-bottom: var(--bottom-padding, var(--page-padding));

  & > p {
    font-size: 1.125rem;
  }

  & > * + * {
    margin-top: var(--element-margin);
  }
`;

const Form = styled.form`
  position: relative;
  padding-bottom: 3rem;
  --border-style: 1px solid var(--black);

  & > * + * {
    margin-top: 1rem;
  }
`;

const InputLabel = styled.label`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.2em;
`;

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  padding-bottom: 2rem;
`;

const InputStyle = css`
  border: var(--border-style);
  background-color: var(--background-light);
  padding: 0.7em;
`;

const EmailInput = styled.input`
  ${InputStyle}
`;

const TextInput = styled.textarea`
  ${InputStyle}
  resize: vertical;
  min-height: 10em;
`;

const FormError = styled.span.attrs({ role: 'alert' })`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  color: var(--warning);
  font-weight: 500;
`;

const FormSubmitError = styled(FormError)`
  font-size: 1.125em;
`;

const FormSubmitSuccess = styled(FormSubmitError)`
  color: var(--success);
`;

const iconStyles = css`
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: 0.5em;
`;

const WarningIcon = styled(AiOutlineWarning)`
  ${iconStyles}
`;

const SuccessIcon = styled(AiOutlineCheckCircle)`
  ${iconStyles}
`;

const SubmitButton = styled.button`
  border: var(--border-style);
  background-color: var(--background-light);
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: all ease-in-out 0.15s;

  &:hover,
  &:focus {
    transform: translateY(-0.2em);
    box-shadow: 0 0.2em var(--black);
  }

  &:active {
    transform: translateY(0.1em);
    box-shadow: 0 -0.1em var(--black);
  }

  &:disabled {
    transform: translateY(0);
    box-shadow: none;
    background-color: var(--background-dark);
    cursor: not-allowed;
  }
`;