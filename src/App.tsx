import * as React from 'react';
import AddVocabulary from './components/AddVocabulary'
import Dictionary from './components/Dictionary'
import styled from 'styled-components'


const App: React.FC = () => {
  const Wrapper = styled.section`
    align-self: flex-start;
  `;


  return (
    <div className="wrapper">
      <Wrapper>
        <AddVocabulary />
      </Wrapper>
      <Dictionary />
    </div>
  );
}

export default App;