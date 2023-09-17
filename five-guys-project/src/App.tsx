import './App.css'
import styled from 'styled-components'

function App() {

  return (
    <Wrapper>
      <Title>Hello, styled-components!</Title>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 2rem;
  color: #333;
`;

