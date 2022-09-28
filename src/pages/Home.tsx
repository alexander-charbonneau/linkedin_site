import React, { useState } from 'react';
import {motion} from "framer-motion"
import TypeWriterEffect from 'react-typewriter-effect';

export default function Home() {

    let [input, setInput] = useState("");
    let [output, setOutput] = useState('Type "help" for a list of available commands.' + "\n" + "\n");
    let [usersName, setUsersName] = useState("");
    let [lastInput, setLastInput] = useState("");
    let [welcomeMessage, setWelcomeMessage] = useState("Welcome");

    function sendIt (value) {
        let commandAsArray = value.split(" ");
        let outputUpdater = "";
        if (value === "help"){
            outputUpdater = output + "\n"
            + "AlexBash, version 4.2.0-release (x86_64-pc-linux-gnu)" + "\n" + "\n"
            + " setname: [name]" + "\n" + "\n"
            ;
            setOutput(outputUpdater)
        }   else if (commandAsArray[0] === "setname") {
            outputUpdater = output + "\n" + "Welcome " + commandAsArray[1] + "! Let's talk" + "\n";
            setOutput(outputUpdater)
            setWelcomeMessage("Welcome " + commandAsArray[1])
            setUsersName(commandAsArray[1])

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
    <h1 className="header-1">{welcomeMessage}</h1>
    <div className="typewriter-container">
    <TypeWriterEffect
            textStyle={{ fontFamily: 'Courier New', fontSize: "16px"}}
            startDelay={200}
            cursorColor="#ffffff"
            multiText={[
                'Hey there, welcome to my personal LinkedIn website! :)',
                "I've designed it to quickly demonstrate my ability to both build and host dynamic web applications.",
                "Let's begin . . .",
                "Please enter your name in the terminal below."
              ]}
            multiTextDelay={696}
            typeSpeed={75}
            hideCursorAfterText={true}
    />
    </div>
    <div className="crt-display">
    <div className="terminal">
        <p className="terminal-output">
            {output}
        </p>
        <span className="bash-prefix">root@127.0.0.1:~#<input 
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
                }
            }} 
        /></span>
    </div>
    </div>
    </motion.div>
  )
}
