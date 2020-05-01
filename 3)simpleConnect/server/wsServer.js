//https://nicgoon.tistory.com/235
const WebSocketModule = require ("ws");

module.exports = function(_server){
	
	const WebSocketServer = new WebSocketModule.Server({server:_server});
	
	WebSocketServer.on('connection',function(websocket,req){
		let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log(ip+ "클라이언트에서 접속 요청이 있습니다.");
		
		websocket.on('message',function(message){
			console.log(ip + ":" + message);
			
			//메세지 전송
			websocket.send("echo:"+message);
			
			//websocket.broadcast.emit(ip + ":" + message);
		});
		
		
		websocket.on('error',function(error){
			console.log(ip+'클라이언트와 연결 중 오류 발생 : '+ error);
		})
		websocket.on('close',function(){
			console.log(ip+'클라이언트와 접속이 해제되었습니다');
		})
	});
}