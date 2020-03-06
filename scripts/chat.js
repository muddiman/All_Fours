/*
*   Chat Client (Browser version)
*
*   src="https://cdn.twomanallfours.com/code/libs/js/chatjs/v1.0.0/chat.js"    integrity="sha256-kjfgklktgjegkljegjegjeg" crossorigin="anonymous"
*
*   @COMMIT: working chat client w/known bugs demarked below. Fixed bugs on server end.
*   
*/


const HEADER_LEN=3;
const MAX_MSG_LENGTH=140;
const MAX_MSG_LIST_LEN=8;
const STAGE='dev'
const HOST='chat.twomanallfours.com'
const CHATSERVER='wss://chat.twomanallfours.com/dev';         // development/testing stage. remove '/dev' when production stage is deployed.


/**
 * Chat Object - preserves the script's namespace in larger web applications.
 * 
 */
var Chat = {
    wSocket: null,
    room: "",
    username: "User",
};      

Chat.wSocket = new WebSocket(CHATSERVER);
let outgoingMsg = JSON.stringify({
                    'route': '',
                    // 'room': "",
                    'userid': '',
                    'text': ''
                })
// let incomingMsg = {
//             'timestamp': '',
//             'userid': '',
//             'text': ''
//         }



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

function incomingMsgHandler(data) {
    console.log('Message Received!');
    let incomingMsg = JSON.parse(data);
    console.log(incomingMsg);
    if (msgList.length >= MAX_MSG_LIST_LEN) {
        msgList.shift();
    }
    // add broadcast from chat server to msg list
    if (incomingMsg['message']){
        incomingMsg['text'] = incomingMsg['message'];
        incomingMsg['userid'] = 'ATTN';
    }
    msgList.push(incomingMsg);       
    viewMsgList(msgList);           
}

function onSendingChatMsg(event) {
    let msg = $('#msg').val();
    document.getElementById("msg").value = "";
    console.log(`Typed Message: ${msg}`);
    sendMsg(msg);
    event.preventDefault();
}

function sendMsg(chatMsg) {
    // build message object
    let newMsgObj = {
        route: 'sendMessageRequest',
        userid: Chat.username,
        text: chatMsg
    };
    addMsgToList(newMsgObj);
    viewMsgList(msgList);
    let jsonMsg = JSON.stringify(newMsgObj);
    Chat.wSocket.send(jsonMsg);
};

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
    }
};
function receiveMsg(msg) {
    // process received data into a message object
    let decryptedMsg = decryptMsg(msg);
    return parse(decryptedMsg);
}

function viewMsgList(msgArr) {
    // message list: an array of message objects
    let ul = document.getElementById("message-list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
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
function sendConnectionMsg() {
    systemAlert('Connected to chat server...');    
    console.log('Connection OPENED!');
    let connectionMsg = JSON.stringify({
                "route": "applyUserId",
                "userid": Chat.username,
                // "text": `Hi, this is ${Chat.username}.`
            });
    Chat.wSocket.send(connectionMsg);
}

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
        userid: `ATTN`,
        text: `<span class="system-alert"> ****** ${localSystemMsg} ******</span>`,
    };
    msgList.push(alertObject);
}


/*
*                             ################ MAIN ################
*/

connectToChatServer();
console.log("Loading chat application...");
var msgList = [];
viewMsgList(msgList);

