/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import {motion} from "framer-motion"
import TypeWriterEffect from 'react-typewriter-effect';

export default function Bash() {

    let [input, setInput] = useState("");
    let [output, setOutput] = useState('Type "help" for a list of available commands.' + "\n" + "\n");
    let [usersName, setUsersName] = useState("");
    let [lastInput, setLastInput] = useState("");
    let [header, setHeader] = useState("Welcome");

    const message_1 = (
        <TypeWriterEffect
        textStyle={{ fontFamily: 'Courier New', fontSize: "16px", textAlign:"center"}}
        startDelay={200}
        cursorColor="#ffffff"
        multiText={[
            'Hey there, welcome to my personal W.I.P website! :)',
            "I'm designing it to demonstrate my ability to both build and host dynamic web applications.",
            "Let's begin . . .",
            "Please enter your name in the terminal below."
          ]}
        multiTextDelay={696}
        typeSpeed={75}
        hideCursorAfterText={true}
        />
    )

    let [message, setMessage] = useState(message_1);

    const inputEl = useRef(null);

    useEffect(() => {
        inputEl.current.focus();
    }, []);

    useEffect(() => {
        if (usersName === "") {
            console.log("not defined")
        } else {
            setMessage("")
        }
    }, [usersName]);


    function sendIt (value) {
        let commandAsArray = value.split(" ");
        let outputUpdater = "";
        if (value === "help"){
            outputUpdater = output + "\n"
            + "AlexBash, version 4.2.0-release (x86_64-pc-linux-gnu)" + "\n" + "\n"
            + ' help                |Recall this menu' + "\n" + "\n"
            + ' clear               |Clear the console' + "\n" + "\n"
            + ' setname [name]      |Set your name' + "\n" + "\n"
            + ' passwd  [password]  |Set your name' + "\n" + "\n"
            ;
            setOutput(outputUpdater)
        }   else if (commandAsArray[0] === "setname") {
            outputUpdater = output + "\n" + "Welcome " + commandAsArray[1] + "! Glad to see you can type commands!" + "\n" + "\n"
            + "Now create a password." + "\n";
            setOutput(outputUpdater)
            setHeader("Welcome " + commandAsArray[1])
            setUsersName(commandAsArray[1])

        }   else if (commandAsArray[0] === "clear") {
            setOutput("")

        }   else {
            outputUpdater = output + "\n" + "-bash: " + value + ": command not found" + "\n";
            setOutput(outputUpdater)
        }

    }

  return (
    <motion.div
    className="body-wrapper"
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    <h1 className="header-1">{header}</h1>
    <div className="typewriter-container">
    {message}
    </div>
    <div className="crt-display">
    <div className="terminal">
        <p className="terminal-output">
            {output}
        </p>
        <div className="input-bar">
        <span className="bash-prefix">root@127.0.0.1:~#<input 
            autofocus="true"
            autoFocus={true}
            ref={inputEl}
            className="bash"
            type="text" 
            value={input} 
            onChange={e=>setInput(e.target.value)} 
            onKeyDown={e=>{
                if (e.key === "Enter"){
                    let outputUpdater = "";
                    outputUpdater = output + "\n" + "$" + "root@127.0.0.1:~# " + input + "\n";
                    setOutput(outputUpdater)
                    sendIt(input)
                    setLastInput(input)
                    setInput("")
                } else if (e.keyCode === 38){
                    setInput(lastInput)
                } else if (e.keyCode === 40){
                    setInput("")
                }
            }} 
        /></span>
        </div>
    </div>
    </div>
    </motion.div>
  )
}
