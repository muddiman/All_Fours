/**
*   Chat Client (Browser version)
*   __author__ = 'sauce_code, sauceCode'
*   src="https://cdn.twomanallfours.com/code/libs/js/chatjs/v1.2.0/chat.js"    integrity="sha256-kjfgklktgjegkljegjegjeg" crossorigin="anonymous"
*
*    @AUTHOR/PROGRAMMER: muddicode/sauceCode
*    @VERSION: 1.2.0  
*
*    @NEXT_COMMIT:
*       @VERSION: 1.2.0
*       
*/


//  ***FLAGS***
const DEBUGGING=true;
// const SOUND_MODE=INACTIVE;

var msgList = [];


//  ***CONSTANTS***
const HEADER_LEN=3;
const MAX_MSG_LENGTH=140;   
const MAX_MSG_LIST_LEN=8;
const STAGE='prod';         // dev
const HOST='chat.twomanallfours.com';
const CHATSERVER=`wss://${HOST}/${STAGE}`;         // development/testing stage. remove '/dev' when production stage is deployed.
const altSERVER_ADDR=`wss://ljy888l5y0.execute-api.us-east-1.amazonaws.com/${STAGE}`;


/**
 * DEBUGGING OBJECT
 */
var DEBUG = {
    mode: DEBUGGING,
    msg: function (variable) {
            if (this.mode === true) {
                console.log(variable);
            }        
          },
    sendSystemCommand: function () {

    }
};


/**
 * Chat Object - preserves the script's namespace in larger web applications.
 * 
 */
var Chat = {
    wSocket: new WebSocket(CHATSERVER),
    room: "",
    username: null,
    connectionID: "",
    messages: [],
    init: function () {
            console.log("Initializing Chat Object...");
            // setup callbacks;
            this.wSocket.onopen     = function (event) {this.sendClientDetails(event);};
            this.wSocket.onmessage  = function (event) {incomingDataHandler(event.data);};
            this.wSocket.onerror    = function (event) {this.ErrorHandler(event.data);};
            this.wSocket.onclose    = function (event) {this.autoReconnect(event);};
            return this;
        },
    setUsername: function (name) {
                    Chat.username = name;
                    return this;
                },
    getUsername: function () {
                    return Chat.username;
                },
    messageHandler: function (data) {
                        incomingMsgObj = JSON.parse(data.data);
                        console.log(incomingMsgObj);
                        if (msgList.length >= MAX_MSG_LIST_LEN) {
                            msgList.shift();
                        }
                        msgList.push(incomingMsgObj);
                        return this;
                    },
    sendClientDetails: function () {
                        systemAlert('Connecting to chat server...');    
                        DEBUG.msg('Sending connection details...');
                        let clientDetails = {
                                "route": "$connect",                
                                "userid": Chat.username,
                                "text": `${Chat.username} entered the chat.`
                                };
                        Chat.wSocket.send(JSON.stringify(clientDetails));
                    },
    sendMsg: function (text) {
                let msg = {
                    "route": "message",
                    "userid": Chat.username,
                    "text": text
                };
                this.wSocket.send(msg);
            },
    ErrorHandler: function (data) {
        DEBUG.msg("WebSocketError occurred.");
    },
    closeConnection: function (ev) {
        DEBUG.msg("Connection to chat server closed.");
    },
    addMsg: function (msg) {
        //  ADD msg to msg list
        if (this.messages.length === MAX_MSG_LIST_LEN) {
            this.messages.shift();
        }
        this.messages.push();
    },
    displayMessages: function (msg) {
                            // message list: an array of message objects
                        let ul = document.getElementById("message-list");
                        while (ul.firstChild) {
                            ul.removeChild(ul.firstChild);
                        }    
                        // populate chat area with recent msgs
                        msgArr.forEach(chatMsg => {
                            let listElement = document.createElement("li");
                            listElement.setAttribute("class", "chat-message");
                            listElement.innerHTML = `<span class="msg-handle">[${chatMsg.userid}]:</span> ${chatMsg.text}`;
                            ul.appendChild(listElement);       
                        });
    },
    displayChatApp: function() {
                        let x = document.getElementById("myChat");
                        x.style.visibility = "visible";
                        document.getElementById("openChatBtn").style.display = "none";
                        return this;
                    },
    hideChatApp:    function () {
                        let x = document.getElementById("myChat");
                        x.style.visibility = "hidden";
                        document.getElementById("openChatBtn").style.display = "block";
                    },               
    autoReconnect: function (ev) {
        systemAlert("reconnecting...");
        this.wSocket.OPEN();
    }
};  


// SETUP Chat Client
function setupChatClient() {    
    if (Chat.username === "User") {
        // please input a username
        systemAlert('Please enter your name.');
    } else {
        setUsername();
    }
}

// SETUP msg object
let outgoingMsg = JSON.stringify({
                    'route': '',
                    // 'room': "",
                    'userid': '',
                    'text': ''
                });


function encryptMsg(key, msg) {
    // encrypts outgoing messages
    let encryptionKey = "abcdef";
}

function decryptMsg(key, msg) {
    // decrypts incoming messages
    let decryptionKey = "abcdef";
}

function getEncryptionKey() {
    // retrieve a fresh key from database containing key
    let encryptionKey = 'UserSecret';
    return encryptionKey;
}

function incomingDataHandler(incomingData) {
    let data = JSON.parse(incomingData);
    // let data = incomingData;
    // console.log(incomingData);
    DEBUG.msg(incomingData);
    DEBUG.msg(data);
    if (data.message) {
        //  errorResponseHandler(data.message);
        // DEBUG.msg(data.message);
        DEBUG.msg(data.message);
        return;
    }
    if (data.userid) {
        if (data.userid === 'SERVER MESSAGE') {
            //  serverResponseHandler(data.body);
            return;
        } else {
            incomingMsgHandler(data);
            return;
        }
    }
}

function incomingMsgHandler(msgObject) {
    DEBUG.msg('Received: Chat Message!');
    let msg = {
        "userid":   msgObject.userid,
        "text":     msgObject.text
    };
    if (msgList.length >= MAX_MSG_LIST_LEN) {
        msgList.shift();
    }    
    msgList.push(msg);       
}

function serverResponseHandler(responseFromServer) {
    let response = JSON.parse(responseFromServer);
    if (response.body.userid === 'SERVER MESSAGE') {
        DEBUG.msg(response.body.userid);
    }
    switch (responseFromServer['statusCode']) {
        case 200:
            // display in chat window
            break;
        case 400:
            // display in console only (for debugging purposes)
            break;    
        case 500:
            // display in console only (for debugging purposes)
            break;
        default:
            break;
    }
}                                     




function onSendingChatMsg(event) {
    event.preventDefault();
    if (Chat.username == null) {
        systemAlert("Please enter your name in the CONTROL PANEL and click on ENTER.");
    } else {
        let msg = $('#msg').val();
        document.getElementById("msg").value = "";
        DEBUG.msg(`Typed Message: ${msg}`);
        sendMsg(msg);
    }
}


function sendMsg(chatMsg) {
    // build message object
    let newMsgObj = {
            "route": "message",
            "timestamp": "",
            "userid": Chat.username,
            "text": chatMsg
    };
    Chat.wSocket.send(JSON.stringify(newMsgObj));
}


function addMsgToList(latestMsg) {
    if (msgList.length >= 8) {
        msgList.shift();
    }
    msgList.push(latestMsg);  
}


function parse(msg) {
    // turn chat string into a message object
    return {
        timestamp : "",
        user: "",
        text: ""
    };
}


function receiveMsg(msg) {
    // process received data into a message object
    let decryptedMsg = decryptMsg(msg);
    return parse(decryptedMsg);
}


/**
 * Displays list of last 10 messages in chat window
 * @param {array} msgArr List of last 10 messages
 */
function viewMsgList(msgArr) {
    // message list: an array of message objects
    let ul = document.getElementById("message-list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }    
    // populate chat area with recent msgs
    msgArr.forEach(chatMsg => {
        let listElement = document.createElement("li");
        listElement.setAttribute("class", "chat-message");
        listElement.innerHTML = `<span class="msg-handle">[${chatMsg.userid}]:</span> ${chatMsg.text}`;
        ul.appendChild(listElement);       
    });
} 


/**
 * OPEN a websocket connection to the chat API.  
 * Loads the necessary websocket handlers.
 * @param: ipAddress (str)
 * @returns: void
 */
/* function connectToChatServer() {
    Chat.wSocket.onopen     = function (event) {sendConnectionMsg();};
    Chat.wSocket.onmessage  = function (event) {incomingMsgHandler(event.data);};
    Chat.wSocket.onerror    = function (event) {displaySocketError(event.data);};
    Chat.wSocket.onclose    = function (event) {displayClosedConnectionMsg();};
}
 */

/**
 * Displays websocket exceptions.   
 * @param {string} err captured error message 
 * @returns void 
 */
function displaySocketError(err) {
    DEBUG.msg('ERROR!!!');
    systemAlert(err);    
}


/**
 * Displays a custom alert message when the connection is closed by the server. 
 * @returns void    
 */
function displayClosedConnectionMsg() {
    let alertMsg = 'Connection closed by server!';
    DEBUG.msg(alertMsg);
    systemAlert(alertMsg);
}


/**
 * 
 * @param {string} localSystemMsg - displays system message in chat window. 
 */
function systemAlert(localSystemMsg) {
    let alertObject = {
        userid: `SYSTEM`,
        text: `<span class="system-alert"> ****** ATTN: ${localSystemMsg} ******</span>`,
    };
    msgList.push(alertObject);
    viewMsgList(msgList);
}


/* function debugMsg(text_) {
    if (DEBUG === true) {
        console.log(text_);
    }
}
 */
function showChatWindow() {
    document.getElementById("myChat").style.visibility = "visible";
    document.getElementById("openChatBtn").style.display = "none";
}


function hideChatWindow() {
    let x = document.getElementById("myChat");
    x.style.visibility = "hidden";
    document.getElementById("openChatBtn").style.display = "block";
}


function usernameHandler(ev) {
    let name = document.getElementById("player_name").value;
    document.getElementById("player_name").value = "";
    DEBUG.msg(`Player Name: ${name}`);
    Chat.setUsername(name).init();
    Chat.sendClientDetails();
    ev.preventDefault();
}




/*
*                             ################ MAIN ################
*/

// debugMsg("Loading chat application...");
// SETUP
// Chat.setup();
// OPEN WEB SOCKET
// Chat.wSocket.OPEN();
// CONNECT TO SERVER
// APPLY A USERID
// connectToChatServer();
// RECEIVE CONFIRMATION FROM SERVER
// SEND MESSAGES
// LISTEN FOR MESSAGES
// var msgList = [];
const display = setInterval(() => {
                                viewMsgList(msgList);    
                            }, 500);

