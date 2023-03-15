import { createContext, useState } from "react";
import { Pairs } from "./components/pairs";

export const PairsContext = createContext(null);

function App() {

  const [file, setFile] = useState(null);

  return (
    <PairsContext.Provider value={{file, setFile}}>
      <Pairs />
    </PairsContext.Provider>
  );
}

export default App;
