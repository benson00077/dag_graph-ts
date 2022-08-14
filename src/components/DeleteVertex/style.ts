import styled from 'styled-components'

export const Form = styled.form`
  width: 8rem;
  position: absolute;
  right: 300px;
  bottom: 2rem;

  label {
    color: ${({ theme }) => theme.text};
  }

  input {
    color: ${({ theme }) => theme.text};
    width: 8rem;
    height: 1.5rem;
    font-size: 1.08rem;
    text-align: center;

    /* glassmorphism */
    background: ${({ theme }) => theme.select};
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    &::placeholder {
      color: ${({ theme }) => theme.text};
      opacity: 0.5;
    }
  }
`
