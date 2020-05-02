//https://nicgoon.tistory.com/235
const WebSocketModule = require ("ws");

//유저 정보 저장용. 나중에 "이름" 식으로 바꾸기.
var Clients=[];
//var id;


module.exports = function(_server){
	
	const WebSocketServer = new WebSocketModule.Server({server:_server});
	
	WebSocketServer.on('connection',function(websocket,req){
		let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log(ip + "클라이언트에서 접속 요청이 있습니다.");
		
		/*
		id = SelectID();
		if (id === -1){
			websocket.send("너무 많은 사용자가 접속중입니다. 잠시 후 다시 시도해주세요.");
			websocket.close();
		}
		*/		
		//Clients[id] = websocket;
		Clients.push(websocket);
		
		
		//console.log(id+"설정완료");
		
		websocket.on('message',function(message){
			console.log(":" + message);
			
			//에코 코드
			//websocket.send("echo:"+ message);
			sendOmit(" : " + message,websocket);
		});
		
		
		
		websocket.on('error',function(error){
			console.log(ip+'클라이언트와 연결 중 오류 발생 : '+ error);
		})
		websocket.on('close',function(){
			console.log(ip+'클라이언트와 접속이 해제되었습니다');
			//Clients[id] = undefined;			
		})
	});
}
function SelectID(){
	var i = 0;
	while(i < 100){		
		if (typeof(Clients[i]) === "undefined")
			return i;		
		
		i++;
	}
	return -1;	
}

function sendAll(message) {
    console.log('sendAll : ');
    for (var j=0; j < Clients.length; j++) {        
        console.log(message);
        Clients[j].send(message);
    }
}
function sendOmit(message,websocket) {    
    for (var i = 0; i < Clients.length; i++) {
		console.log(i);
        if(Clients[i] !== websocket){
			console.log(message);
			Clients[i].send(message);
		}
    }
}
/*
function sendOmit(message) {    
    for (var j = 0; j < Clients.length; j++) {
		console.log(j);
        if(j !== id){
			console.log(message);
			Clients[j].send(message);
		}
    }
}
*/