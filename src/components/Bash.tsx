/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TypeWriterEffect from "react-typewriter-effect";
import ky from "ky";

export default function Bash() {
  const bottomRef = useRef(null);

  let [input, setInput] = useState("");
  let [output, setOutput] = useState(
    'Type "help" for a list of available commands.' + "\n"
  );
  let [usersName, setUsersName] = useState("");
  let [isRegister, setIsRegister] = useState("false");
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

  let [message, setMessage] = useState(message_1);

  useEffect(() => {
    if (usersName === "") {
      console.log("Username not defined.");
    } else {
      setMessage("");
    }
  }, [usersName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  async function sendIt(value) {
    let commandAsArray = value.split(" ");
    let outputUpdater = "";
    if (value === "help") {
// HELP ////////////////////////////////////////////////////////////////////////
      outputUpdater =
        output +
        "\n" +
        "$" +
        "root@127.0.0.1:~# " +
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
        " setname [name]      |Set your name" +
        "\n" +
        "\n" +
        " passwd  [password]  |Set your name" +
        "\n" +
        "\n";
      setOutput(outputUpdater);
    } else if (commandAsArray[0] === "setname") {
// SETNAME ////////////////////////////////////////////////////////////////////////
      if (commandAsArray[1] === undefined) {
        outputUpdater =
          output +
          "\n" +
          "$" +
          "root@127.0.0.1:~# " +
          value +
          "\n" +
          "\n" +
          "Missing parameters!" +
          "\n";
        setOutput(outputUpdater);
      } else if (commandAsArray[1].length < 4){
        outputUpdater =
          output +
          "\n" +
          "$" +
          "root@127.0.0.1:~# " +
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
          "$" +
          "root@127.0.0.1:~# " +
          value +
          "\n" +
          "\n" +
          "Welcome " +
          commandAsArray[1] +
          "! Glad to see you can type commands!" +
          "\n";
        setOutput(outputUpdater);
        setHeader("Welcome " + commandAsArray[1]);
        setUsersName(commandAsArray[1]);
      }
    } else if (commandAsArray[0] === "clear") {
// CLEAR ////////////////////////////////////////////////////////////////////////
      setOutput("");
    } else if (commandAsArray[0] === "test") {
// TEST ////////////////////////////////////////////////////////////////////////
const serverResponse = await ky.get('http://localhost:42069/ehpeei/test').json().then((r) => r.body)
        outputUpdater =
          output +
          "\n" +
          "$" +
          "root@127.0.0.1:~# " +
          value +
          "\n" +
          "\n" +
          serverResponse +
          "\n";
          setOutput(outputUpdater);
} else if (commandAsArray[0] === "register") {
// Register ////////////////////////////////////////////////////////////////////////
      if (usersName) {
        setIsRegister("true");
        outputUpdater =
          output +
          "\n" +
          "$" +
          "root@127.0.0.1:~# " +
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
          "$" +
          "root@127.0.0.1:~# " +
          value +
          "\n" +
          "\n" +
          "Please set your username!" +
          "\n";
        setOutput(outputUpdater);
      }
    } else if (isRegister === "true") {

      if (lastInput === commandAsArray[0]){
        const serverResponse = await ky.post('http://localhost:42069/ehpeei/register', {json: {userName: usersName, userPass: usersPassword}}).json();
        outputUpdater =
        output +
        "\n" +
        serverResponse.body +
        "\n";
      setOutput(outputUpdater);
      setUsersPassword("")
      setLastInput("")
      setIsRegister("false");
      } else {
        setUsersPassword(commandAsArray[0])
        outputUpdater =
        output +
        "\n" +
        "Please re-enter your password!" +
        "\n";
      setOutput(outputUpdater);
      }

      //const json = await ky.get('http://localhost:42069/ehpeei/register').json().then((r) => r.requestBody);
      //console.log(json)



    } else {
// (NO COMMAND) ////////////////////////////////////////////////////////////////////////
      outputUpdater =
        output +
        "\n" +
        "$" +
        "root@127.0.0.1:~# " +
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
                root@127.0.0.1:~#
                <input
                  autofocus="true"
                  autoFocus={true}
                  className="bash"
                  type={isRegister === "false" ? "text" : "password"}
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
