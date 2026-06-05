/*
#
#   _ _____        __    ____   ___ __
#  (_) ___/__  ___/ /__ / __/__/ (_) /____  ____
# / / /__/ _ \/ _  / -_) _// _  / / __/ _ \/ __/
#/_/\___/\___/\_,_/\__/___/\_,_/_/\__/\___/_/
#
*/


//  Purpose: 
//  this file provide protocol for client side scripting iCodeEditor that
//  can be easily integrated with AI code assistant,  Model Context
//  Protocol (MCP) client, the communication use normal TCP based JSON
//  format message, this protocol is independent of programming language,
//  although this prototype implemented with JavaScript, but user can
//  scripting iCodeEditor with other languages, such as Lua and Ruby, etc.
//


function makeRequst(msgtype, data, args){
    requst = `{"msgtype": "${msgtype}", "accesscode": "${accesscode}", "data": "${data}", "args": "${args}"}`
    return requst;
}


function makeWebRequst(msgtype, mimetype, encoding, baseurl, data){
    requst = `{"msgtype": "${msgtype}", "accesscode": "${accesscode}", ` +
    `"MIMEType": "${mimetype}", "Encoding": "${encoding}", "BaseURL": "${baseurl}", "data": "${data}",  }`
    return requst;
}


// send message to iCodeEditor
function sendRequst(string, waiting){
    const req = JSON.parse(string);
    if(waiting) {
        const obj = requestWaitingData(req);
        console.log("iCodeEditor return:", obj);
        appendLiveData(obj);
    }else {
        requestNoWaiting(req);
    }
};


function stringToBase64(aString){
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(aString);
    const base64String = uint8Array.toBase64();
    return base64String;
};


//dynamically add/remove  symbol references in iCodeEditor
function removeAllTokenIndex(){
    const path = "client.js"; //relative to document directory of iCodeEditor
    let string = makeRequst('removeAllTokenIndex', path, '');
    sendRequst(string, true);
};


function addTokenIndex(){
    const path = "client.js"; //relative to document directory of iCodeEditor
    //records key pairs: symbol as key, line number as value
    const aString = `{"isAccessible": "97", "stackoverflow.com": "114", "Buffer.from": "139" }`
    let string = makeRequst('addTokenIndex', path, stringToBase64(aString));
    sendRequst(string, true);
};


function removeTokenIndex(sock){
    const path = "client.js"; //relative to document directory of iCodeEditor
    //records is array
    const aString = `{"isAccessible", "stackoverflow.com", "Buffer.from" }`
    let string = makeRequst('removeTokenIndex', path, stringToBase64(aString));
    sendRequst(string, true);
};



// Note:
// a. iCodeEditor will automatically decode file path and text string that contains Unicode representations,
//    e.g., convert '\U3059\U3079\U3066\U306e\U4eba\U9593...' to 'すべての人間は...'.
// b. Some data field in message from iCodeEditor was encoded with base64.
function processRequsts(sock){
    
      const testString = "client side scripting iCodeEditor";
          
          //1. isAccessible (unused)
          //2. isIgnoreFile
	      //const string = makeRequst('fileOperation', '/Users/yeung/Desktop/奈良桜/mcp_agent.js', '3');
          //sendRequst(string, true);
          
          // open file in the text editor, args=line number, optional
          // *** Note: args = -1, goto end of the file
	      // let string = makeRequst('openFile', 'iOS/Makefile', '20');
          // sendRequst(string, false);

          // open local file or remote url associated resource in the built-in browser.
          //*** Note: just input relative path of the file for local files
          //let string = makeRequst('openURL', 'https://bing.com', '');
          //let string = makeRequst('openURL', 'https://google.com', '');
          //let string = makeRequst('openURL', 'https://stackoverflow.com', '');
          //let string = makeRequst('openURL', 'small_software_manifesto.txt', '');
          //let string = makeRequst('openURL', 'post.html', '');
          //sendRequst(string, false);
          
          
          //1. show the text in console (unused).
          //2. insert the text at current cursor position.
          //3. replace current selection with the text.
          //4. append the text to end of current file.
          //5. insert the text at the beginning of current file.
          //6. create a new temporary file with the text.
          //const string = makeRequst('textOperation', testString, '1');
          //sendRequst(string, false);
          

          //instantly show program generated raw data of graph or other web content in the built-in browser.
          //MIMEType: (e.g., "text/plain", "text/html", "image/bmp", "image/jpeg", "image/png", "application/pdf",  "image/svg+xml")
          //    Word: application/msword (.doc) Excel: application/vnd.ms-excel (.xls) PowerPoint: application/vnd.ms-powerpoint (.ppt)
          //Encoding: text encoding, usually "utf-8" or "utf-16", be empty for non-text data.
          //BaseURL:  a valid URL required, default is "http://localhost".
          //Note:
          //***  a. "Encoding" must be empty to indicate the data is base64 encoded binary data.
          //***  b. if a file already saved on disk (local files), more reliable way is to use "openURL".
          const bitmap = fs.readFileSync('sad.webp'); // Read binary data
          // Convert binary data to base64 encoded string
          const base64Image = Buffer.from(bitmap).toString('base64');
          const string = makeWebRequst('showInBrowser', 'image/webp', '', '', base64Image);
          sendRequst(string, false);

          // a. ***, placeholder, data length can't be 0
          // b. current selection encoded with base64
          // fetch path of current file, cursor location, and current selection
          // const string = makeRequst('currentFileInfo', '***', '');
          // sendRequst(string, true);
    
          
          //5. fetchRecentList (fixed value)
          //Note:
          //a. ***, placeholder, data length can't be 0
          //b. please decode "line brief" with base64 when listBookmarks()
          //const string = makeRequst('dbOperation', '***', '5');
          //sendRequst(string, true);
    

          //dynamically add/remove symbol indexes
          //addTokenIndex();
          //removeTokenIndex();
     
    
};



