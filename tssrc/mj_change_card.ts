namespace mj {
    export class ChangeCard {
        static __Ins__: ChangeCard = null;
        static getInstance(): ChangeCard {
            if (ChangeCard.__Ins__ == null) {
                ChangeCard.__Ins__ = new ChangeCard();
            }
            return ChangeCard.__Ins__;
        }

        //将 1-34 手牌牌值   转换成 0-33 的索引数组
        public changeIndexArr(arr) {
            var t = {};
            for (var i = 0; i < arr.length; i++) {
                if (!t[arr[i]]) t[arr[i]] = 0;

                t[arr[i]] += 1;
            }
            var ret = [];
            for (var i = 1; i < 35; i++) {
                ret.push(t[i] ? t[i] : 0);
            }
            return ret;
        }

        //将正常手牌数组转成 1-34编号的手牌数组
        public trimCardArrNum(CardArr) {
            var resArr = [];
            for (var i = 0; i < CardArr.length; i++) {
                if (CardArr[i] <= 9 && CardArr[i] > 0) {
                    resArr.push(CardArr[i] - 0);
                } else if (CardArr[i] <= 19 && CardArr[i] >= 11) {
                    resArr.push(CardArr[i] - 1);
                } else if (CardArr[i] <= 29 && CardArr[i] >= 21) {
                    resArr.push(CardArr[i] - 2);
                } else if (CardArr[i] <= 37 && CardArr[i] >= 31) {
                    resArr.push(CardArr[i] - 3);
                }
            }
            return resArr;
        }

        //将正常手牌牌值转成 1-34编号的手牌牌值
        public trimCardNum(num) {
            if (num <= 9 && num > 0) {
                return num - 0;
            } else if (num <= 19 && num >= 11) {
                return num - 1;
            } else if (num <= 29 && num >= 21) {
                return num - 2;
            } else if (num <= 37 && num >= 31) {
                return num - 3;
            }
        }

        //将正常手牌牌值转成 0-33 索引
        public trimCardIndex(num) {
            if (num <= 9 && num > 0) {
                return num - 1;
            } else if (num <= 19 && num >= 11) {
                return num - 2;
            } else if (num <= 29 && num >= 21) {
                return num - 3;
            } else if (num <= 37 && num >= 31) {
                return num - 4;
            }
        }

        //将  1-34编号的手牌牌值  转成  正常手牌牌值
        public numChangeZi(num) {
            if (num <= 9 && num > 0) {
                return num + 0;
            } else if (num <= 18 && num >= 10) {
                return num + 1;
            } else if (num <= 27 && num >= 19) {
                return num + 2;
            } else if (num <= 34 && num >= 28) {
                return num + 3;
            }
        }

        //将 0-33 索引 转成  正常手牌牌值
        public indexChangeZi(num) {
            if (num <= 8 && num >= 0) {
                return num + 1;
            } else if (num <= 17 && num >= 9) {
                return num + 2;
            } else if (num <= 26 && num >= 18) {
                return num + 3;
            } else if (num <= 33 && num >= 27) {
                return num + 4;
            }
        }

        //将 0-33 索引数组 转成  正常手牌牌值数组
        public indexChangeZiArr(CardArr) {
            var resArr = [];
            for (var i = 0; i < CardArr.length; i++) {
                if (CardArr[i] <= 8 && CardArr[i] > 0) {
                    resArr.push(CardArr[i] + 1);
                } else if (CardArr[i] <= 17 && CardArr[i] >= 9) {
                    resArr.push(CardArr[i] + 2);
                } else if (CardArr[i] <= 26 && CardArr[i] >= 18) {
                    resArr.push(CardArr[i] + 3);
                } else if (CardArr[i] <= 33 && CardArr[i] >= 27) {
                    resArr.push(CardArr[i] + 4);
                }
            }
            return resArr;
        }








    }

}