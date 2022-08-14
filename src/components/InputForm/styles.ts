import styled from 'styled-components'

export const Vertex_input = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  padding: 1.5rem;

  /* glassmorphism */
  background: ${({ theme }) => theme.select};
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};

  label {
    width: 10rem;
  }

  input {
    color: ${({ theme }) => theme.text};
    width: 10rem;
    height: 1.5rem;
    font-size: 1.08rem;
    text-align: center;
    margin: 0 0 1rem 0;

    /* glassmorphism -- upper layer*/
    background: ${({ theme }) => theme.select};
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    &::placeholder {
      color: ${({ theme }) => theme.text};
      opacity: 0.5;
    }
  }
`

export const Button = styled.button`
  margin-top: 0.5rem;
  padding: 5px 0 5px 0;
  font-size: 1.3rem;
  width: 10rem;

  /* glassmorphism -- upper layer*/
  background: ${({ theme }) => theme.button};
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  color: ${({ theme }) => theme.text};

  &.btn-mouse-down {
    transform: scale(0.95);
  }
`
