namespace mj {
    export class MjListen {

        static __Ins__: MjListen = null;
        static getInstance(): MjListen {
            if (MjListen.__Ins__ == null) {
                MjListen.__Ins__ = new MjListen();
            }
            return MjListen.__Ins__;
        }


        public getListen(cards, magic) {
            var t = Date.now();
            let ting = {};
            ting = this.checkT(cards, magic);
            for (var x in ting) {
                if (ting[x].length > 0 && ting[x].indexOf(magic) < 0) {
                    ting[x].push(magic);
                }
            }
            console.log('【查听耗时】=>' + (Date.now() - t));
            return ting
        }


        public checkT(handCards, magic) {
            let tempTing = {};
            var count = handCards.length;
            for (var i = 0; i < count; i++) {
                var tempCards = lodash.clone(handCards);
                tempCards.splice(i, 1);
                var tingNum = [];
                tingNum = this.isComeOneHu(tempCards, magic);
                if (tingNum.length > 0) {
                    tempTing[handCards[i]] = tingNum;
                }
            }
            return tempTing;
        }


        //..........分割  无牌权 搜索可以胡的牌 .. 当前操作不是自己时 调这个方法 判断是否有来一张字 就能胡 .........//
        public isComeOneHu(cards, magic) {
            var t = Date.now();
            //这里传入的是 1-37的牌型
            let tempMagicIndex = ChangeCard.getInstance().trimCardIndex(magic);          //  赖子牌值  转  索引数组
            let tempCards = ChangeCard.getInstance().trimCardArrNum(cards);              //  正常牌值  转  1-34 牌值
            var cardIndexArr = ChangeCard.getInstance().changeIndexArr(tempCards);
            var tingNum = [];
            for (var j = 0; j < 34; j++) {
                cardIndexArr[j] += 1;
                var resPP = mj_hulib.getInstance().get_hu_info(cardIndexArr, tempMagicIndex);
                if (resPP) {
                    tingNum.push(ChangeCard.getInstance().indexChangeZi(j));
                }
                cardIndexArr[j] -= 1;
            }
            if (tingNum.indexOf(magic) < 0 && tingNum.length > 0) {
                tingNum.push(magic);
            }
            console.log('OverTime=>' + (Date.now() - t));
            return tingNum
        }


    }
}
