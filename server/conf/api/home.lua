local cjson = require "cjson"
local conn = require "api.db_connection"

-- 요청된 userid 가져오기
local args = ngx.req.get_uri_args()
local userid = args.userid

-- MySQL 연결 설정
local db = conn.get_db()

-- 해당 userid의 DailyGoal 객체 가져오기
local query = "SELECT * FROM DailyGoal WHERE UserId = '"..userid.."' ORDER BY Date DESC LIMIT 10"
local res, err, errcode, sqlstate = db:query(query)
if not res then
  ngx.log(ngx.ERR, "Failed to fetch DailyGoal data: ", err)
  return
end

-- 결과를 JSON 형식으로 변환하여 응답 보내기
local response = {
  userid = userid,
  dailygoals = res
}

ngx.header.content_type = "application/json"
ngx.say(cjson.encode(response))

-- 연결 닫기
conn.return_db(db)
