import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TypeWriterEffect from "react-typewriter-effect";
import ky from "ky";

export default function Bash() {
  const bottomRef = useRef(null);

  let [input, setInput] = useState("");
  // eslint-disable-next-line
  let [output, setOutput] = useState('Type "help" for a list of available commands.' + "\n");
  let [sessionUser, setSessionUser] = useState("pleb@127.0.0.1:~# ");
  let [usersName, setUsersName] = useState("");
  let [isRegister, setIsRegister] = useState("false");
  let [isLogin, setIsLogin] = useState("false");
  let [passToggle, setPassToggle] = useState("false");
  let [usersPassword, setUsersPassword] = useState("");
  let [lastInput, setLastInput] = useState("");
  let [header, setHeader] = useState("Welcome");

  const message_1 = (
    <TypeWriterEffect
      textStyle={{
        fontFamily: "Courier New",
        fontSize: "16px",
        textAlign: "center",
      }}
      startDelay={200}
      cursorColor="#ffffff"
      multiText={[
        "Hey there, welcome to my personal W.I.P website! :)",
        "I'm designing it to demonstrate my ability to both build and host dynamic web applications.",
        "Let's begin . . .",
        "Please set a username in the terminal below.",
      ]}
      multiTextDelay={696}
      typeSpeed={75}
      hideCursorAfterText={true}
    />
  );

  async function getIP() {
    const geoLoactionDB = await ky
      .get("https://geolocation-db.com/json/")
      .json()
      .then((r) => {
        return r.IPv4;
      });
    return geoLoactionDB;
  }

  let [message, setMessage] = useState(message_1);

  useEffect(() => {
    if (usersName === "") {
      async function preauth(){
        const IPADDRESS = await getIP().then((r) => r);
        var token = localStorage.getItem("AlexBashSesh");
        const serverResponse = await ky
        .post("http://localhost:42069/ehpeei/jwtcheck", {
          json: { token: token },
        })
        .json();
        console.log(serverResponse)
        setSessionUser(serverResponse.userName + "@" + IPADDRESS + ":~# ");
        setHeader();
        setMessage("Welcome back, " + serverResponse.userName)
      }
      preauth();
    } else {
      setMessage("");
    }
  }, [usersName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  async function sendIt(value) {
    const IPADDRESS = await getIP().then((r) => r);
    let commandAsArray = value.split(" ");
    let outputUpdater = "";
    if (value === "help" && isLogin === "false" && isRegister === "false") {
      // HELP ////////////////////////////////////////////////////////////////////////
      outputUpdater =
        output +
        "\n" +
        sessionUser +
        value +
        "\n" +
        "\n" +
        "AlexBash, version 4.2.0-release (x86_64-pc-linux-gnu)" +
        "\n" +
        "\n" +
        " help                |Recall this menu" +
        "\n" +
        "\n" +
        " clear               |Clear the console" +
        "\n" +
        "\n" +
        " su [name]           |Set username" +
        "\n" +
        "\n" +
        " register            |Sign up" +
        "\n" +
        "\n" +
        " login               |Sign in" +
        "\n" +
        "\n";
      setOutput(outputUpdater);
    } else if (
      commandAsArray[0] === "su" &&
      isLogin === "false" &&
      isRegister === "false"
    ) {
      // SETNAME ////////////////////////////////////////////////////////////////////////
      if (commandAsArray[1] === undefined) {
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Missing parameters!" +
          "\n";
        setOutput(outputUpdater);
      } else if (commandAsArray[1].length < 4) {
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Username must be at least 4 characters!" +
          "\n";
        setOutput(outputUpdater);
      } else {
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Welcome " +
          commandAsArray[1] +
          "!" +
          "\n" +
          "\n" +
          'Type "register" to register or "login" to login!' +
          "\n";
        setOutput(outputUpdater);
        setHeader("Welcome " + commandAsArray[1]);
        setUsersName(commandAsArray[1]);
      }
    } else if (
      commandAsArray[0] === "clear" &&
      isLogin === "false" &&
      isRegister === "false"
    ) {
      // CLEAR ////////////////////////////////////////////////////////////////////////
      setOutput("");
    } else if (
      commandAsArray[0] === "test" &&
      isLogin === "false" &&
      isRegister === "false"
    ) {
      // TEST ////////////////////////////////////////////////////////////////////////
      const serverResponse = await ky
        .get("http://localhost:42069/ehpeei/test")
        .json()
        .then((r) => r.body);
      outputUpdater =
        output +
        "\n" +
        sessionUser +
        value +
        "\n" +
        "\n" +
        serverResponse +
        "\n";
      setOutput(outputUpdater);
    } else if (
      commandAsArray[0] === "logout" &&
      isLogin === "false" &&
      isRegister === "false"
    ) {
      // LOGOUT ////////////////////////////////////////////////////////////////////////
      var deletejwt = localStorage.removeItem("AlexBashSesh");
      console.log(deletejwt)
      setSessionUser("pleb@127.0.0.1:~# ")
      setHeader("")
      setMessage("")
      outputUpdater =
      "\n" +
      "Logged out!" +
      "\n";
    setOutput(outputUpdater);
    } else if (
      commandAsArray[0] === "register" &&
      isLogin === "false" &&
      isRegister === "false"
    ) {
      // Register ////////////////////////////////////////////////////////////////////////
      if (usersName) {
        setIsRegister("true");
        setPassToggle("true")
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Type in your password and press enter!" +
          "\n";
        setOutput(outputUpdater);
      } else {
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Please set your username!" +
          "\n";
        setOutput(outputUpdater);
      }
    } else if (isRegister === "true") {
      if (lastInput === commandAsArray[0]) {
        const serverResponse = await ky
          .post("http://localhost:42069/ehpeei/register", {
            json: { userName: usersName, userPass: usersPassword },
          })
          .json();
        outputUpdater = output + "\n" + serverResponse.body + "\n";
        setOutput(outputUpdater);
        setUsersPassword("");
        setLastInput("");
        setIsRegister("false");
        setPassToggle("false")
      } else {
        setUsersPassword(commandAsArray[0]);
        // eslint-disable-next-line
        outputUpdater = output + "\n" + "Please re-enter your password!" + "\n";
        setOutput(outputUpdater);
      }
    } else if (
      commandAsArray[0] === "login" &&
      isLogin === "false" &&
      isRegister === "false"
    ) {
      // Login ////////////////////////////////////////////////////////////////////////
      if (usersName) {
        setIsLogin("true");
        setPassToggle("true")
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Type in your password and press enter!" +
          "\n";
        setOutput(outputUpdater);
      } else {
        outputUpdater =
          output +
          "\n" +
          sessionUser +
          value +
          "\n" +
          "\n" +
          "Please set your username!" +
          "\n";
        setOutput(outputUpdater);
      }
    } else if (isLogin === "true") {
      const serverResponse = await ky
        .post("http://localhost:42069/ehpeei/login", {
          json: { userName: usersName, userPass: commandAsArray[0] },
        })
        .json();
      outputUpdater = output + "\n" + serverResponse.body + "\n";
      setOutput(outputUpdater);
      setUsersPassword("");
      setLastInput("");
      setIsLogin("false");
      setPassToggle("false")
      if (serverResponse.isLoggedIn === true) {
        setHeader();
        setMessage("Welcome back, " + usersName)
        localStorage.setItem("AlexBashSesh", serverResponse.token);
        outputUpdater = "\n" + serverResponse.body + "\n";
        setOutput(outputUpdater);
        setSessionUser(usersName + "@" + IPADDRESS + ":~# ");
      }
    } else {
      // (NO COMMAND) ////////////////////////////////////////////////////////////////////////
      outputUpdater =
        output +
        "\n" +
        sessionUser +
        value +
        "\n" +
        "\n" +
        "-bash: " +
        value +
        ": command not found" +
        "\n";
      setOutput(outputUpdater);
    }
  }

  return (
    <motion.div
      className="body-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="header-1">{header}</h1>
      <div className="typewriter-container">{message}</div>
      <div className="crt-display">
        <div className="crt-inlet">
          <div className="terminal">
            <span className="terminal-output">
              <div className="fix"></div>
              {output}
              <div ref={bottomRef} />
            </span>
            <div className="input-bar">
              <span className="bash-prefix">
                {sessionUser}
                <input
                  autofocus="true"
                  autoFocus={true}
                  className="bash"
                  type={passToggle === "false" ? "text" : "password"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendIt(input);
                      setLastInput(input);
                      setInput("");
                    } else if (e.keyCode === 38) {
                      setInput(lastInput);
                    } else if (e.keyCode === 40) {
                      setInput("");
                    }
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
