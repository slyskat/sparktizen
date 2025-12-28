import styled, { css } from 'styled-components';
import { shake } from '../styles/Animations';
import { useDrop } from '../contexts/DropContext';
import { Subtitle } from '../ui/Subtitle';
import { ArrowRight, Lock } from 'lucide-react';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const FormContainer = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0;
  }
`;

const OracleForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem; */

  ${(props) =>
    props.$isShaking &&
    css`
      animation: ${shake} 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    `}
  @media (min-width: 640px) {
    padding-bottom: 1rem;
  }
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--foreground);

  &:focus {
    border-color: var(--foreground);
    outline: none;
  }

  &::placeholder {
    color: var(--muted-foreground);
    opacity: 0.5;
  }

  @media (min-width: 640px) {
    font-size: 0.75rem;
    line-height: 1rem;
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: var(--muted-foreground);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--foreground);
  }
`;

const Separator = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  height: 1px;
  background-color: var(--border);
`;

const WaitlistContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  padding: 2rem;
  max-width: 32rem;
  margin: 0 auto;
  backdrop-filter: blur(4px);

  @media (min-width: 640px) {
    padding: 2.5rem;
  }
`;

const WaitlistHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  /* Icon styling inside */
  & > svg {
    color: var(--muted-foreground);
  }
`;

const WaitlistTitle = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: 1.5rem;
  letter-spacing: -0.025em;
  color: var(--foreground);
  margin: 0;

  @media (min-width: 640px) {
    font-size: 2rem;
  }
`;

const WaitlistForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const WaitlistDescription = styled(Subtitle)`
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0.7;
`;

const EmailInput = styled(Input)`
  padding: 0.75rem;
  text-align: left;
  border-color: rgba(255, 255, 255, 0.5);

  &:focus {
    border-color: var(--foreground);
  }
`;

const AccessButton = styled.button`
  background: var(--foreground);
  color: var(--background);
  border: none;
  padding: 0.75rem 2rem;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CopyrightText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: var(--muted-foreground);
  opacity: 0.4;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-align: center;
  padding-top: 1rem;
`;

function Footer() {
  const { isUnlocked } = useDrop();
  return (
    <FooterContainer>
      <FormContainer>
        <Subtitle style={{ marginBottom: '1.25rem', opacity: 0.6 }}>
          HAVE A PASSWORD?
        </Subtitle>

        <OracleForm>
          <Input
            type="password"
            autoComplete="off"
            placeholder="ENTER PASSWORD"
          />
          <SubmitButton type="submit" aria-label="Submit code">
            <ArrowRight size={18} strokeWidth={1.5} />
          </SubmitButton>
        </OracleForm>
      </FormContainer>

      <Separator />

      <WaitlistContainer>
        <WaitlistHeader>
          <Lock size={14} strokeWidth={1.5} />
          <WaitlistTitle>JOIN THE WAITLIST</WaitlistTitle>
        </WaitlistHeader>

        <WaitlistDescription>
          Be the first to receive the password when the collection drops.
        </WaitlistDescription>

        <WaitlistForm>
          <EmailInput />
          <AccessButton>GET ACCESS</AccessButton>
        </WaitlistForm>
      </WaitlistContainer>

      <CopyrightText>© 2025 SPARTIZEN. ALL RIGHTS RESERVED.</CopyrightText>
    </FooterContainer>
  );
}

export default Footer;
