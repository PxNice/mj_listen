var lodash = lodash || null;
if (module) {
    lodash = require('lodash');
}

var cc = cc || {};
cc.sys = cc.sys || {};
cc.loader = cc.loader || {};
cc.sys.isNative = false;
var jsb = null;

function setTblpath(res) {
    lodash.extend(mj.res, res);
}

namespace mj {
    export var res = {
        tblallpath: jsb && jsb.fileUtils ? jsb.fileUtils.getWritablePath() + "remote-assets/mj/res/mj/tbl/tbl_all/" : "res/mj/tbl/tbl_all/",
    }
}

setTblpath({
    tblallpath: "res/tbl/tbl_all/",
});


cc.loader.loadJson = function (path: string, call: (err, tbl) => void) {
    if (!module && window && window.document && window.location) {
        let axios = require("axios");
        axios({
            method: 'get',
            url: path,
            responseType: 'json'
        }).then(function (response) {
            call(null, response.data);
        }).catch(function (error) {
            console.log(error);
            call(error, null);
        });

    } else {
        let fs = require("fs");
        fs.readFile(path, { encoding: "utf-8" }, function (err, data) {
            call(err, data);
        });
    }
}

class main {
    private static __INS__: main = null;
    public static getInstance(call?: Function): main {
        if (main.__INS__ == null) {
            main.__INS__ = new main();
            main.__INS__.init(call);
        }
        return main.__INS__;
    }

    init(call) {
        let timer = new Date().getTime();
        mj.MjTbaleMgr.getInstance().init();
        Promise.all([
            mj.MjTbaleMgr.getInstance().LoadTable(),
            mj.MjTbaleMgr.getInstance().LoadFengTable(),
        ]).then(function () {
            console.log('【牌型表加载用时】 ', (new Date().getTime() - timer) / 1000 + '秒');
            call && call();
        })
    }

    getListen(handCards, magic) {
        return mj.MjListen.getInstance().getListen(handCards, magic);
    }

    isComeOneHu(handCards, magic) {
        return mj.MjListen.getInstance().isComeOneHu(handCards, magic);
    }
}


if (module) {
    module.exports = {
        main,
        setTblpath
    }
}
