import { createContext, useState } from "react";

export const CoinContext = createContext({
  coin: null,
  setCoin: () => null,
});

const CoinProvider = ({ children }) => {
  const [coin, setCoin] = useState(0);

  return (
    <CoinContext.Provider value={{ coin, setCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinProvider;
