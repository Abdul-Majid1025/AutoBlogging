import styled from 'styled-components';

const Wrapper = styled.div`
  height: 20px;
  width: fit-content;
  padding: 1px 12px;
  background-color: ${(props) => (props.color)};
  font-size: 12px;
  font-weight: 500;
  border-radius: 15px;
  color: white;
  text-align: center;
`;

type Props = {
  color: string;
  text: string | number;
}
const Pill = function Pill(props: Props) {
  const { color, text } = props;

  return (
    <Wrapper color={color}>
      {text}
    </Wrapper>
  );
}

export default Pill;
