local conn = require "api.db_connection"
local cjson = require "cjson"

local returnData = {}
local method = ngx.req.get_method()
if "GET" == method then
    
    
elseif "POST" == method then
    ngx.req.read_body()  -- 요청 본문 읽기 추가
    local req_body = ngx.req.get_body_data()
    -- ngx.say(req_body) --id=hong&pw=1234 -> {"id":"hong","pw":"1234"}
    local res, err = pcall(cjson.decode,req_body)
    -- ngx.say(res)

    if not res then
        ngx.say("res is nil or false")
    else
        local data = cjson.decode(req_body)
        -- ngx.say(data["id"])
        -- TODO 데이터를 mysql 테이블에 저장할거야.
        local db = conn.get_db()
        local id = ngx.quote_sql_str(data["id"])
        local pw = ngx.quote_sql_str(data["pw"])
        local query = "insert into result.user (id,pw) values (".. id .. ",".. pw ..")"

        local res, err, errcode, sqlstate = db:query(query)        
        if not res then
            error("insert not performed")
            ngx.exit()
        end
        returnData = {"result : " ,res}
        ngx.say(cjson.encode(returnData))
        conn.return_db(db)
    end
end



