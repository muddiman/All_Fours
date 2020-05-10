/**
*   Chat Client (Browser version)
*   __author__ = 'sauce_code, sauceCode'
*   src="https://cdn.twomanallfours.com/code/libs/js/chatjs/v1.0.0/chat.js"    integrity="sha256-kjfgklktgjegkljegjegjeg" crossorigin="anonymous"
*
*    @AUTHOR/PROGRAMMER: muddicode/sauceCode
*    @VERSION: 1.0.0  
*
*   @NEXT_COMMIT:
* 
*/


/* 
const ON=true;
const OFF=false;



//  ***FLAGS***
const DEBUG=OFF;
 */
const DEBUG=false;

//  ***CONSTANTS***
const HEADER_LEN=3;
const MAX_MSG_LENGTH=140;
const MAX_MSG_LIST_LEN=8;
const STAGE='dev';// dev
const HOST='chat.twomanallfours.com';
const CHATSERVER=`wss://chat.twomanallfours.com/${STAGE}`;         // development/testing stage. remove '/dev' when production stage is deployed.
const altSERVER=`wss://ljy888l5y0.execute-api.us-east-1.amazonaws.com/${STAGE}`;



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
            console.log("initializing...");
            // setup callbacks;
            this.wSocket.onopen     = function (event) {this.sendClientDetails(event);};
            this.wSocket.onmessage  = function (event) {incomingMsgHandler(event.data);};
            this.wSocket.onerror    = function (event) {this.ErrorHandler(event.data);};
            this.wSocket.onclose    = function (event) {this.autoReconnect(event);};
            // Chat.wSocket.OPEN();
            // Chat.wSocket.send(msg);
            return this;
        },
    setUsername: function (name) {
            Chat.username = name;
            return this;
            // setupChatClient();
            // setupWebSocket();
        },
    messageHandler:   (data) => {
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
        console.log('Sending connection details...');
        let clientDetails = {
                "route": "$connect",                
                "userid": Chat.username,
                "text": `${Chat.username} entered the chat.`
                };
        Chat.wSocket.send(JSON.stringify(clientDetails));
    },
    sendMsg: function (text) {
        let msg = {
            "route": "sendMessageRequest",
            "userid": Chat.username,
            "text": text
        };
        this.wSocket.send(msg);
    },
    ErrorHandler: function (data) {
        console.log("WebSocketError occurred.");
    },
    closeConnection: function (ev) {
        console.log("Connection to chat server closed.");
    },
    addMsg: function (msg) {

    },
    displayMessages: function (msg) {

    },
    autoReconnect: function (ev) {
        systemAlert("reconnecting...");
        this.wSocket.OPEN();
    }
};  

/* 
function setUsername(name) {
    Chat.username = name;
    // connectToChatServer();
}  */


// SETUP web socket
/* function setupWebSocket() {
    Chat.wSocket = new WebSocket(CHATSERVER);
    Chat.wSocket.onopen     = function (event) {sendConnectionMsg();};
    Chat.wSocket.onmessage  = function (event) {incomingMsgHandler(event);};
    Chat.wSocket.onerror    = function (event) {displaySocketError(event.data);};
    Chat.wSocket.onclose    = function (event) {displayClosedConnectionMsg();};
    // Chat.wSocket.OPEN();
    // Chat.wSocket.send(msg);
} */

// Chat.wSocket = new WebSocket(CHATSERVER);

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
// let incomingMsg = {
//             'timestamp': '',
//             'userid': '',
//             'text': ''
//         }
/* 
//  message object
let message = {
    "route": route,
    "timestamp": null,
    "userid": userid, 
    "text": text,
};

 */

// dbase(chat table) --> lambda --> client
function encryptMsg(msg) {
    // SHA
    let encryptionKey = "abcdef";
}
function getEncryptionKey() {
    // retrieve key from database containing key
}
  
function responseHandler(responseFromServer) {
    let response = JSON.parse(responseFromServer);
    if (response.body.userid === 'SERVER MESSAGE') {
        console.log(response.body.userid);
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

function incomingMsgHandler(wSocketPacket) {
    // extract JSON object
    console.log(wSocketPacket);
    let msgObject = JSON.parse(wSocketPacket);
    
    console.log(msgObject);
    // let msgObject = JSON.parse(wSocketPacket);
    // let msgObject = wSocketPacket['body'];
    if ( msgObject['userid'] === "SERVER MESSAGE") {
        // system message from server
        console.log('Received: System Message from Server!');  
    } else {
        // chat message
        console.log('Received: Chat Message!');
    }
    let msg = {
        "userid": msgObject['userid'],
        "text": msgObject['text']
    };
    console.log(msgObject);
    console.log(msg['userid']);
    console.log(msg['text']);
    if (msgList.length >= MAX_MSG_LIST_LEN) {
        msgList.shift();
    }    
    if (DEBUG===true) {
        msgList.push(msg);       
    } else {
        if (msgObject['userid'] != 'SERVER MESSAGE') {
            msgList.push(msg);       
        }
    }

    // viewMsgList(msgList);  
}

    // let incomingMsg =  data; //  
 /*   Chat.connectionID = data['connectionId'];
    let serverResponse = {
        // 'connectionId': data['connectionId'],
        "userid": data['userid'],
        "text": data["text"]
    };
    console.log(serverResponse);
    console.log(data); */
         

function onSendingChatMsg(event) {
    event.preventDefault();
    if (Chat.username == null) {
        systemAlert("Please enter your name in the CONTROL PANEL and click on ENTER.");
    } else {
        let msg = $('#msg').val();
        document.getElementById("msg").value = "";
        console.log(`Typed Message: ${msg}`);
        // Chat.sendMsg(msg);
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
    // addMsgToList(newMsgObj);
    // viewMsgList(msgList);
    Chat.wSocket.send(JSON.stringify(newMsgObj));
    // Chat.wSocket.send(newMsgObj);
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

// function clearChatArea() {
//     let ul = document.getElementById("chat-messages");
//     // clear chat-area
//     while (ul.firstChild) {
//         ul.removeChild(ul.firstChild)
//     }
//     if (document.getElementsByClassName("chat-message")) {
//         let oldMsgs = document.getElementsByClassName("chat-message");
//         oldMsgs[0].setAttribute("hidden", "");
//         oldMsgs.forEach(element => {
//             ul.removeChild(element);
//         });        
//     }
// }

/**
 * OPEN a websocket connection to the chat API.  
 * Loads the necessary websocket handlers.
 * @param: ipAddress (str)
 * @returns: void
 */
function connectToChatServer() {
    Chat.wSocket.onopen     = function (event) {sendConnectionMsg();};
    Chat.wSocket.onmessage  = function (event) {incomingMsgHandler(event.data);};
    Chat.wSocket.onerror    = function (event) {displaySocketError(event.data);};
    Chat.wSocket.onclose    = function (event) {displayClosedConnectionMsg();};
    // Chat.wSocket.OPEN();
    // Chat.wSocket.send(msg);
}

/**
 * SENDS json message object to chat server.
 * @param {*} username userid or chat handle
 * @param {*} chatroom chatroom on server to join
 * @returns void
 */
/* function sendConnectionMsg() {
    systemAlert('Connected to chat server...');    
    console.log('Applying userid...');
    let connectionMsg = {
        "route": "sendMessageRequest",                
        "body": {
                    "userid": Chat.username,
                    // "connectionId": Chat.connectionID,
                    "text": `${Chat.username} entered the chat.`
                }
            };
    Chat.wSocket.send(JSON.stringify(connectionMsg));
} */

/* function connectToChatServer() {
    console.log("Connecting to the chat server...");
    let connectionObject = {
        "route": "connect",
        "body": JSON.stringify({
            "userid": Chat.username,  
        })
    };
    Chat.wSocket.send(connectionObject);
} */

function displaySocketError(err) {
    console.log('ERROR!!!');
    systemAlert(err);    
}

function displayClosedConnectionMsg() {
    let alertMsg = 'Connection closed by server!';
    console.log(alertMsg);
    systemAlert(alertMsg);
}

function systemAlert(localSystemMsg) {
    // let svrMsg = JSON.parse(localSystemMsg);
    let alertObject = {
        userid: `SYSTEM`,
        text: `<span class="system-alert"> ****** ATTN: ${localSystemMsg} ******</span>`,
    };
    msgList.push(alertObject);
    // addMsgToList(newMsgObj);
    viewMsgList(msgList);
}


/*
*                             ################ MAIN ################
*/

console.log("Loading chat application...");
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
var msgList = [];
const display = setInterval(() => {
        viewMsgList(msgList);    
    }, 500);

