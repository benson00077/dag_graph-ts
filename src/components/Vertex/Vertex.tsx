import * as S from './styles'

export default function Vertex(props: {
  name: string,
  location: [number, number],
  forwardedRef: React.MutableRefObject<any>,
  forwardedArrowsRefs: React.RefObject<SVGPathElement>[]
}) {
  const {name, location, forwardedRef, forwardedArrowsRefs} = props
  const [row, column] = location
  const [topPosition, leftPosition] = [150 + 150 * row, 150 * column]
  const [topStyle, leftStyle] = [topPosition + "px", leftPosition + "px"]

  let translate = {
    x: 1,
    y: 2,
  }

  let posn = {
    position: `absolute`,
    top: `${topStyle}`,
    left: `${leftStyle}`,
    transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
  };

  return (
    <>
      <S.Container posn={posn} ref={forwardedRef}>
        {name}
      </S.Container>
    </>
  )
}