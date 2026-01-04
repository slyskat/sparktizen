import styled, { css } from 'styled-components';
import { shake } from '../styles/Animations';
import { useDrop } from '../contexts/DropContext';
import { Subtitle } from '../ui/Subtitle';
import { ArrowRight, Lock } from 'lucide-react';
import { useLanding } from '../contexts/LandingContext';
import toast from 'react-hot-toast';
import { toastStyle } from '../utils/toastStyle';
import { CopyrightText, CopyrightTextContainer } from '../ui/CopyrightText';

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
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0;
  }
`;

const OracleForm = styled.form`
  /* border-bottom: 1px solid hsl(var(--border)); */
  /* width: 100%; */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #262626;
  padding-bottom: 0.5rem;

  &:focus-within {
    border-bottom: 1px solid hsl(var(--text-primary));
    outline: none;
  }

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
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--text-primary));
  outline: none;

  &::placeholder {
    color: hsl(var(--text-secondary));
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
  color: hsl(var(--text-secondary));
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: hsl(var(--text-secondary));
  }
`;

const Separator = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  height: 1px;
  background-color: hsl(var(--text-primary));
  z-index: 100;
`;

const WaitlistContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(23, 23, 23, 0.3);
  width: 100%;
  padding: 2rem;
  max-width: 32rem;
  margin: 0 auto;
  backdrop-filter: blur(4px);
  position: relative;

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

  & > svg {
    color: rgb(115, 115, 115);
  }
`;

const WaitlistTitle = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: 1.25rem;
  line-height: 1.75rem;
  letter-spacing: -0.025em;
  color: hsl(var(--text-primary));
  margin: 0;

  @media (min-width: 640px) {
    font-size: 1.5rem;
    line-height: 2rem;
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
  text-transform: none;
`;

const EmailInput = styled(Input)`
  width: 100%;
  padding: 0.75rem 0;
  text-align: left;
  border: none;
  border-bottom: 1px solid #404040;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: color cubic-bezier(0.4, 0, 0.2, 1) 300ms;

  &:focus {
    border-color: hsl(var(--text-primary));
  }

  &::placeholder {
    color: rgb(64, 64, 64);
  }
`;

const AccessButton = styled.button`
  background: hsl(var(--text-primary));
  color: hsl(var(--bg-background));
  border: none;
  padding: 0.75rem 2rem;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: rgb(229, 229, 229 / 1);
  }

  &:active {
    transform: translateY(0);
  }
`;

function Footer() {
  const { unlockStore } = useDrop();
  const { email, setEmail, passcode, setPasscode, setIsShaking } = useLanding();

  function submitPasscode(e) {
    e.preventDefault();

    if (!passcode.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      toast.error('ACCESS DENIED', {
        description: 'Enter your oracle code to proceed.',
        style: toastStyle,
      });
      return;
    }

    const success = unlockStore(passcode);
    if (success) {
      toast.success('ACCESS GRANTED', {
        description: 'Welcome to the drop. Your session has begun.',
        style: { ...toastStyle, border: '1px solid hsl(0 0% 40% )' },
      });
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      toast.error('INVALID CODE', {
        description: 'This passcode is not recognized.',
        style: toastStyle,
      });
    }
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email.includes('@') || !email.trim()) {
      toast.error('INVALID EMAIL', {
        description: 'Please enter a valid email address.',
        style: toastStyle,
      });
      return;
    }
    toast.success('WAITLIST JOINED', {
      description: "You'll be notified when the drop goes live.",
      style: { ...toastStyle, border: '1px solid hsl(0 0% 30%)' },
    });
    setEmail('');
  }

  return (
    <FooterContainer>
      <FormContainer>
        <Subtitle style={{ marginBottom: '1.25rem', opacity: 0.6 }}>
          HAVE A PASSWORD?
        </Subtitle>

        <OracleForm onSubmit={submitPasscode}>
          <Input
            type="password"
            autoComplete="off"
            placeholder="ENTER PASSWORD"
            id="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
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

        <WaitlistForm onSubmit={handleEmailSubmit}>
          <EmailInput
            placeholder="YOUR EMAIL"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AccessButton>GET ACCESS</AccessButton>
        </WaitlistForm>
      </WaitlistContainer>

      <CopyrightTextContainer>
        <CopyrightText>© 2025 SPARKTIZEN. ALL RIGHTS RESERVED.</CopyrightText>
      </CopyrightTextContainer>
    </FooterContainer>
  );
}

export default Footer;
