local conn = require "api.db_connection"
local cjson = require "cjson"
-- lua modules

local db = conn.get_db()

res, err, errcode, sqlstate = db:query("select * from result.user")
if not res then
    ngx.say("bad result : ", err, ": ", errcode, ": ", sqlstate)
    return 
end
ngx.say("result : ", cjson.encode(res))

conn.return_db(db)
