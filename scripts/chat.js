/**
*   Chat Client (Browser version)
*   __author__ = 'sauce_code, sauceCode'
*   src="https://cdn.gallatinengineering.com/code/libs/js/oletalk/v1.1.1/chat.js"    integrity="sha256-kjfgklktgjegkljegjegjeg" crossorigin="anonymous"
*
*    @AUTHOR/PROGRAMMER: muddicode/sauceCode
*    @VERSION: 1.1.1  
*    @LICENSE: SAAS, ChaaS --> Chat as a Service register, get a key for website & user w/30 day expiry date.
*    @NEXT_COMMIT:
*       @VERSION: 1.1.1
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
const STAGE='prod';         // OR dev
const HOST='chat.twomanallfours.com';
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
    wSocket: new WebSocket(CHATSERVER),
    room: "",
    username: "",
    connectionID: "",
    messages: [],
    init: function () {
            DEBUG.msg("Initializing Chat Object...");
            /* setup callbacks  */
            this.wSocket.onopen     = function (event) {this.sendClientDetails(event);};
            this.wSocket.onmessage  = function (event) {Chat.messageHandler(event);};
            this.wSocket.onerror    = function (event) {this.errorHandler(event.data);};
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
    setChatRoom: function (room) {
                    Chat.room = room;
                    return this;
                },                                                                                                                                                  
    getChatRoom: function () {
                    return Chat.room;
                },
    sendClientDetails: function () {
                        Chat.errorMessage('System', 'Connecting to chat server...');    
                        DEBUG.msg('Sending connection details...');
                        let clientDetails = {
                                "route": "$connect", 
                                "room": Chat.getChatRoom(),               
                                "userid": Chat.getUsername(),
                                "text": `${Chat.getUsername()} entered the chat.`
                                };
                        Chat.wSocket.send(JSON.stringify(clientDetails));
                    },
    sendMsg: function (event) {
                event.preventDefault();
                if (Chat.getUsername() === "") {
                    Chat.errorMessage('System', 'Please enter your name.');
                } else {
                    let msgText = document.getElementById('msg').value;
                    let msg = {
                        "route": "message",
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
                                Chat.systemMessage('Remote Server', data.text);
                                return;
                            } else {
                                messageHandler(data);
                                return;
                            }
                        }
                    return;
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


function encryptMsg(msg) {
    // encrypts outgoing messages
    let encryptionKey = "abcdef";
}

function decryptMsg(msg) {
    // decrypts incoming messages
    let decryptionKey = "abcdef";
}

function generateSessionEncryptionKey() {
    // create a fresh public/private key pair for this session
}

/* function incomingDataHandler(incomingData) {
    let data = JSON.parse(incomingData);
    DEBUG.msg(incomingData);
    DEBUG.msg(data);
    if (data.message) {
        if (data.message === 'Internal server error') {
            Chat.errorMessage('Remote Server', data.message);
            DEBUG.msg(data.message);
            return;
        }
    } else {
        if (data.userid) {
            if (data.userid === 'SERVER MESSAGE') {
                Chat.errorMessage('Remote Server', data.text);
                return;
            } else {
                messageHandler(data);
                return;
            }
        }
    return;
    } 
} */

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


/* function onSendingChatMsg(event) {
    event.preventDefault();
    if (Chat.username == null) {
        systemAlert("Please enter your name in the CONTROL PANEL and click on ENTER.");
    } else {
        let msg = $('#msg').val();
        document.getElementById("msg").value = "";
        DEBUG.msg(`Typed Message: ${msg}`);
        Chat.wSocket.send(JSON.stringify(buildChatMsg(msg)));
    }
} */

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


/* function addMsgToList(latestMsg) {
    if (msgList.length >= 8) {
        msgList.shift();
    }
    msgList.push(latestMsg);  
}
 */


/* 
function receiveMsg(msg) {
    // process received data into a message object
    let decryptedMsg = decryptMsg(msg);
    return parse(decryptedMsg);
}
 */

/* function viewMsgList(msgArr) {
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
}  */




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
    console.log(ev);
    let playerName = document.getElementById("player_name").value;
    let room = document.getElementById("room_name").value;
    Chat.setUsername(playerName).setChatRoom(room).init();
    DEBUG.msg(`Player Name: ${Chat.getUsername()}`);
    DEBUG.msg(`Chat Room: ${Chat.getChatRoom()}`);
    playerName.value = "";
    room.value = "";
    showChatWindow();
    close('controlPanel');
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
const display = setInterval(() => {
                                Chat.displayMessages();
                            }, 500);

