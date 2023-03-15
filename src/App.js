import { createContext, useState } from "react";
import { Pairs } from "./pages/pairs";

//context for app
export const PairsContext = createContext(null);

function App() {

  //state for file to be used within context
  const [file, setFile] = useState(null);

  return (
    <PairsContext.Provider value={{file, setFile}}>
      <Pairs />
    </PairsContext.Provider>
  );
}

export default App;
