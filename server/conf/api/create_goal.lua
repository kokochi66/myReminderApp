local conn = require "api.db_connection"
local cjson = require "cjson"

-- MySQL 연결 설정

local db = conn.get_db()
-- 사용자 입력 받기 (예시로 하드코딩)
ngx.req.read_body()  -- 요청 본문 읽기 추가
local req_body = ngx.req.get_body_data()

local data = cjson.decode(req_body)
-- ngx.say(req_body) --> 7
local goalData = {
  UserId = data.userId,
  StartDate = data.startDate,
  EndDate = data.endDate,
  Type = data.type,
  Description = data.description,
  Criteria = data.criteria
}

-- Goal 정보 저장
local query = "INSERT INTO Goal (UserId, StartDate, EndDate, Type, Description, Criteria, RegDate, ModDate) VALUES ('"..goalData.UserId.."', '"..goalData.StartDate.."', '"..goalData.EndDate.."', "..goalData.Type..", '"..goalData.Description.."', "..goalData.Criteria..", NOW(), NOW())"
local res, err, errcode, sqlstate = db:query(query)
if not res then
  ngx.say("Failed to save Goal: ", err)
  return
end

local result = {result = 1}
ngx.say(cjson.encode(result))

-- 연결 닫기
db:set_keepalive(10000, 100)
