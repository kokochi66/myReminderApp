local mysql = require "resty.mysql"
-- local log = ngx.log
local cjson = require "cjson"

local _M = {}

function _M.get_db()    
-- log.INFO("start get DB connect")
local db, err = mysql:new()
if not db then
    ngx.log(ngx.ERROR,"failed to instantiate mysql : ", err)
    return
end

db:set_timeout(1000)
local ok, err, errcode, sqlstate = db:connect{
    host = "127.0.0.1",
    port = 3306,
    database = "result",
    user = "root",
    password = "dearyou00!",
    charset = "utf8",
    max_packet_size = 1024 * 1024,
}
if not ok then
    ngx.log(ngx.ERROR,"failed to connect : ", err, " : ", sqlstate)
    return
end
ngx.log(ngx.DEBUG,"connected to mysql.")

if not db then
    error("can't connect DB")
end
-- res, err, errcode, sqlstate = db:query("select * from hong.member")
-- if not res then
--     ngx.say("bad result : ", err, ": ", errcode, ": ", sqlstate)
--     return 
-- end
-- ngx.say("result : ", cjson.encode(res))

-- 'don \'t forget to put the connection into the connection pool'
-- local ok, err = db:set_keepalive(10000, 100)
-- if not ok then
--     ngx.say("failed to set keepalive: ", err)
--     return
-- end
    return db
end

function _M.return_db(conn)
    -- 'don \'t forget to put the connection into the connection pool'
    local ok, err = conn:set_keepalive(10000, 100)
    if not ok then
        ngx.say("failed to set keepalive: ", err)
        ngx.exit()
        return nil
    end 
end

return _M
