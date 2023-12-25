var winstonDaily = require('winston-daily-rotate-file');


const { createLogger, format, transports } = require('winston');
const koreanTime = () => new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Seoul',
  });

const logger = createLogger({
     transports: [
        new (winstonDaily)({  // 로그파일 생성에 관한 설정
            name: 'info-file',
            filename: `log/%DATE%.log`,  // %DATE% 이부분이 날짜로 변경, 경로를지정,
            colorize: false,
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "1000",
            level: "info",
            format: format.combine(  // 관련설정 포멧을 설정
                format.label({ label: 'Broomi Member Server' }), // 라벨을 정의(서버호스트명으로 많이사용)
                format.timestamp({    // 시간의 형식을 정의
                    format: koreanTime
                }),
                format.printf(   // 파일안에 로그의 형식을 정의
                    info => `${info.timestamp} ${info.level} ${info.message}`
                )
            ),
            showlevel: true,
            json: false,
        })]
    });

logger.stream = {    // httpd log  출력하기
    write: function(message, encoding) {
        logger.info(message); // 단순히 message를 default 포맷으로 출력
    },
};
    
module.exports = logger; 
