import React, { useState } from "react";

import "./App.css";
import ViewImagePage from "./component/ViewImagePage";
import Uploadpage from "./component/Uploadpage";
import Loginpage from "./component/Loginpage";

function App() {
  const [isauntenticated, setisAuthenticated] = useState("0");
  const [isViewimage, setisViewimage] = useState(0);
  const [ImageArraystring, setImageArraystring] = useState([]);

  function back_to_uploadpage() {
    setisViewimage(0);
    setImageArraystring("");
  }

  return (
    <div className="App">
      <div>
        {isauntenticated === "0" && (
          <Loginpage
            isauntenticated_prop={isauntenticated}
            setisAuthenticated_prop={setisAuthenticated}
          ></Loginpage>
        )}
      </div>
      <div>
        {isauntenticated === "2" && isViewimage === 0 && (
          <Uploadpage
            isViewimage_prop={isViewimage}
            setisViewimage_prop={setisViewimage}
            ImageArraystring_prop={ImageArraystring}
            setImageArraystring_prop={setImageArraystring}
          ></Uploadpage>
        )}
      </div>
      <div>
        {isauntenticated === "2" && isViewimage === 1 && (
          <ViewImagePage
            back_to_uploadpage_prop={back_to_uploadpage}
            imageArraystring_prop={ImageArraystring}
          ></ViewImagePage>
        )}
      </div>
    </div>
  );
}

export default App;
