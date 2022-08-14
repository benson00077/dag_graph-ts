import styled from 'styled-components'

interface Itip {
  show: boolean
}

export const Icon = styled.span`
  position: absolute;
  right: 450px;
  bottom: 2rem;
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  opacity: 0.7;

  &.clicked {
    transform: translate(2px, 2px);
    transition: all 0.1s linear;
    opacity: 1;
  }

  svg {
    color: ${({ theme }) => theme.text};
  }
`

export const toolTip = styled.div<Itip>`
  position: absolute;
  right: 50rem;
  bottom: 10rem;
  color: ${({ theme }) => theme.text};
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 30rem;
    opacity: ${(props) => (props.show ? `1` : `0`)};
    border: solid 1px;
    border-radius: 12px;
    padding: 12px 0 12px 0;

    /*
      To Prevent user selectin inside the drag source
      */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`
