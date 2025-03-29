// import { useEffect, useState } from 'react';
// import { useDeepCompareEffect} from 'react-use';
import './App.css';
import Child1 from './Child1';
import Child2 from './Child2';
import WithLog from './withLog';
const NewChild1 = WithLog(Child1);
const NewChild2 = WithLog(Child2);
function App() {

  return (
    <div className="App">
      <NewChild1 name="谢杰"></NewChild1>
      <NewChild2 age="20"></NewChild2>
    </div>
  );
}

export default App;
