local cjson = require "cjson"
local conn = require "api.db_connection"

-- MySQL 연결 설정
local db = conn.get_db()

-- 이미 발행된 DailyGoal이 발행되어 있는지 확인하는 로직을 만든다.
-- 무조건 자동으로 매일 DailyGoal을 발급하는 것은 낭비다.
-- batch server? 
-- login을 하면 발급을 할까요?


-- 1. 매일 자정에 DailyGoal 발행
local current_date = os.date("%Y-%m-%d")
local query = "INSERT INTO DailyGoal (UserId, Date, DailyStatus, WinningStreak, RegDate, ModDate) SELECT Id, '"..current_date.."', false, 0, NOW(), NOW() FROM User"
local res, err, errcode, sqlstate = db:query(query)
if not res then
  ngx.say("Failed to issue DailyGoal: ", err)
  return
end

-- 2. Goal 정보 가져오기
local query = "SELECT dg.UserId, dg.Date, g.GoalSeq FROM DailyGoal dg INNER JOIN Goal g ON g.UserId = dg.UserId WHERE g.StartDate <= dg.Date AND g.EndDate >= dg.Date"
local res, err, errcode, sqlstate = db:query(query)
if not res then
  ngx.say("Failed to fetch Goal information: ", err)
  return
end

-- 3. DailyGoal_Goal 발급 -> 다른 설계가 필요하다. 
for i, row in ipairs(res) do
  local userid = row.UserId
  local date = row.Date
  local goalSeq = row.GoalSeq

  local query = "INSERT INTO DailyGoal_Goal (DailyGoalSeq, GoalSeq, GoalStatus, RegDate, ModDate) VALUES ((SELECT DailyGoalSeq FROM DailyGoal WHERE UserId = '"..userid.."' AND Date = '"..date.."'), "..goalSeq..", false, NOW(), NOW())"
  local res, err, errcode, sqlstate = db:query(query)
  if not res then
    ngx.say("Failed to issue DailyGoal_Goal: ", err)
    return
  end
end

-- 연결 닫기
conn.return_db(db)