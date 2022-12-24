import "../styles/globals.css";
import { getMonth } from "../util";
import GlobalContext from "../context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import ContextWrapper from "../context/ContextWrapper";
function MyApp({ Component, pageProps }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const { monthIndex } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
}

export default MyApp;
