/**
*   Chat Client (Browser version)
*   __author__ = 'sauce_code, sauceCode'
*
*    @LICENSE: SAAS, ChaaS --> Chat as a Service register, get a key for website & user w/30 day expiry date.
*   src="https://cdn.gallatinengineering.com/code/libs/kaity/js/v1.2.0/kaity.js"    integrity="sha256-kjfgklktgjegkljegjegjeg" crossorigin="anonymous"
*
*    @AUTHOR/PROGRAMMER: muddicode/sauceCode
*    @VERSION: 1.3.0  
*
*    @NEXT_COMMIT:
*       @VERSION: 1.4.0
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
const STAGE='dev';         // OR PROD
const HOST='chat.twomanallfours.com';
const HOST_B='chat.gallatinengineering.com';
const ALT_HOST='ljy888l5y0.execute-api.us-east-1.amazonaws.com';
const CHATSERVER=`wss://${HOST}/${STAGE}`;         // development/testing stage. remove '/dev' when production stage is deployed.
const altSERVER_ADDR=`wss://${ALT_HOST}/${STAGE}`;



/**
 *  THE DEBUGGING OBJECT
 */
var DEBUG = {
    mode: DEBUGGING,
    msg: function (variable) {
            if (this.mode === true) {       // TEST: whether  debugging is 'on' or 'off'
                console.log(variable);
            }        
        },
    sendSystemCommand: function () {
            //  debugging the chat server remotely from chat client using special commands
        }
};


/**
 * Chat Object - preserves the script's namespace in larger web applications.
 * 
 */
var Chat = {
    wSocket: new WebSocket(altSERVER_ADDR),
    // wSocket: new WebSocket(CHATSERVER),
    // wSocket: io(altSERVER_ADDR),
    room: "default",
    server: "twomanallfours.com",
    username: "Me",
    connectionID: "",
    messages: [],       // Array of message objects
    init: function () {
            DEBUG.msg("Initializing Chat Object...");
            
            /* setup callbacks  */
            this.wSocket.onopen     = (event) => this.sendClientDetails(event);
            this.wSocket.onmessage  = (event) => this.messageHandler(event);
            this.wSocket.onerror    = (event) => this.errorHandler(event);
            this.wSocket.onclose    = (event) => this.displayClosedConnectionMsg(event);
            // this.wSocket.OPEN();
            return this;
        },
    setUsername: function (name) {
                    Chat.username = name;
                    return this;
                },
    getUsername: function () {
                    return Chat.username;
                },
    setChatRoom: function (room) {
                    Chat.room = room;
                    return this;
                },                                                                                                                                                  
    getChatRoom: function () {
                    return Chat.room;
                },
    sendClientDetails: function () {
                        DEBUG.msg('System: Connecting to chat server...');    
                        DEBUG.msg('Sending connection details...');
                        let clientDetails = {
                            "body": {
                                    "route": "$connect", 
                                    "server": "twomanallfours.com",
                                    "timestamp": "",
                                    "room": Chat.getChatRoom(),               
                                    "userid": Chat.getUsername(),
                                    "text": `${Chat.getUsername()} entered the chat.`
                                }
                            };
                        Chat.wSocket.send(JSON.stringify(clientDetails['body']));
                        // Chat.wSocket.send(clientDetails['body']);
                            },
    sendMsg: function (event) {
                event.preventDefault();
                if (Chat.getUsername() === "") {
                    DEBUG.msg('System', 'Please enter your name.');
                } else {
                    let msgText = document.getElementById('msg').value;
                    let msg = {
                        "route": "message",
                        "server": "twomanallfours.com",
                        "room": Chat.getChatRoom(),
                        "timestamp": "",
                        "userid": Chat.getUsername(),
                        "text": msgText
                    };
                    this.wSocket.send(JSON.stringify(msg));
                    document.getElementById("msg").value = "";
                }
            },
    errorHandler: function (data) {
                //  catches exceptions and display them. 
                    DEBUG.msg("WebSocketError occurred.");
                },
    closeConnection: function (ev) {
                    DEBUG.msg("Connection to chat server closed.");
                },
    addMsg: function (msg) {
                    //  ADD msg to msgs array
                    if (this.messages.length >= MAX_MSG_LIST_LEN) {
                        this.messages.shift();
                    }
                    this.messages.push(msg);
                },
    messageHandler: function (ev) {
                    //  error, system or chat message
                    let data = JSON.parse(ev.data);
                    DEBUG.msg(ev);
                    DEBUG.msg(data);
                    if (data.message) {
                        if (data.message === 'Internal server error') {
                            Chat.systemMessage('Remote Server', data.message);
                            DEBUG.msg(data.message);
                            return;
                        }
                    } else {
                        if (data.userid) {
                            if (data.userid === 'SERVER MESSAGE') {
                                // Chat.systemMessage('Remote Server', data.text);
                                console.log(data.text);
                                return this;
                            } else {
                                // messageHandler(data);
                                Chat.addMsg(data);
                                return this;
                            }
                        }
                    return this;
                    }
                }, 
    displayMessages: function () {
                    // message list: an array of message objects
                    let ul = document.getElementById("message-list");
                    while (ul.firstChild) {
                        ul.removeChild(ul.firstChild);
                    }    
                    // populate chat area with recent msgs
                    this.messages.forEach(chatMsg => {
                        let listElement = document.createElement("li");
                        listElement.classList.add("chat-message");
                        listElement.innerHTML = `<span class="msg-handle">[${chatMsg.userid}]:</span> ${chatMsg.text}`;
                        if (chatMsg.userid === Chat.username) {
                            listElement.classList.add("myMsgs");                           
                        }                        
                        if (chatMsg.userid === 'Remote Server') {
                            listElement.classList.add("systmMsgs");                           
                        }
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
    displayClosedConnectionMsg: function () {
                    let alertMsg = 'Connection closed by server!';
                    DEBUG.msg(alertMsg);
                    Chat.errorMessage('System', alertMsg);
                    // systemAlert(alertMsg);
                    this.autoReconnect();
                },
    systemMessage:   function (id_, systmMsg) {
                    let msgObj = {
                        userid: id_,
                        text: `<span class="system-alert"> ****** ATTN: ${systmMsg} ******</span>`,
                    };
                   DEBUG.msg(msgObj);
                   this.messages.push(msgObj);
                },                         
    autoReconnect: function (ev) {
                    Chat.errorMessage('System', 'reconnecting...');
                    // systemAlert("reconnecting...");
                    this.wSocket.OPEN();
                }
};  


var ChatRoom = {
    // create chat room
    // delete chat room
    members: [],        // list of participants' usernames
    roomName: "",
    enterChatRoom: () => {},
    leaveChatroom: () => {},
};


/*
                            ****** SUPPORTING FUNCTIONS: ******     
                                   ====================
*/


function encryptMsg(key, msg) {
    // encrypts outgoing messages
    let encryptionKey = "abcdef";
}

function decryptMsg(key, msg) {
    // decrypts incoming messages
    let decryptionKey = "abcdef";
}

function generateSessionEncryptionKey() {
    // create a fresh public/private key pair for this session
    let encryptionKey = 'UserSecret';
    return encryptionKey;
}


function serverResponseHandler(data) {
    // server responses
    let message = {
        text: data.message,
        userid: 'Remote Server'
    }
    Chat.addMsg(message);
}

function messageHandler(msgObject) {
    DEBUG.msg('Received: Chat Message!');
    // let message = JSON.parse(msgObject);
    let msg = {
        "userid":   msgObject.userid,
        "text":     msgObject.text
    };
    Chat.addMsg(msg);
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


/* function buildChatMsg(chatMsg) {
    // build message object
    return {
        "route": "message",
        "room": Chat.getChatRoom(),
        "timestamp": "",
        "userid": Chat.getUsername(),
        "text": chatMsg
    }; 
} */
/* function sendMsg(chatMsg) {
    // build message object
    let newMsgObj = {
            "route": "message",
            "timestamp": "",
            "userid": Chat.username,
            "text": chatMsg
    };
    Chat.wSocket.send(JSON.stringify(newMsgObj));
} */

/* function viewMsgList(msgArr) {

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
 * Displays websocket exceptions.   
 * @param {string} err captured error message 
 * @returns void 
 */
function displaySocketError(err) {
    DEBUG.msg('ERROR!!!');
    systemAlert(err);    
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


function showChatWindow() {
    document.getElementById("myChat").style.visibility = "visible";
    document.getElementById("openChatBtn").style.display = "none";
}


function hideChatWindow() {
    let x = document.getElementById("myChat").style.visibility = "hidden";
    document.getElementById("openChatBtn").style.display = "block";
}


function joinChat(ev) {
    ev.preventDefault();
    let playerName = document.getElementById("username").value;
    let room = document.getElementById("room").value;
    Chat.setUsername(playerName).setChatRoom(room).init();
    DEBUG.msg(`Player Name: ${Chat.getUsername()}`);
    DEBUG.msg(`Chat Room: ${Chat.getChatRoom()}`);
    playerName.value = "";
    room.value = "";
    showChatWindow();
    close('signonbox');
}



/*
*                             ################ MAIN ################
                                       (Test-Execution Code)
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


// Chat.addMsg(welcomeMsg); 
Chat.systemMessage("System Message", "Welcome to OleTalk 1.2!")
const display = setInterval(() => {
                                Chat.displayMessages();
                            }, 200);
                        
