console.log("CRC校验算法");
//数据项
var origin1 = "1101011011";
var origin:Array<string> = origin1.split("");
//除数定义4阶多项式
var dist = "10011".split("");
var n = dist.length;
//需要校验的数据 数据项后补充4个0
origin.push("0");
origin.push("0");
origin.push("0");
origin.push("0");
//设计反转器
var fz = [];
for(var k = 0;k < n;k++){
    if(k != 0 && dist[k] == "1") fz.push(true);
    else fz.push(false);
}
//最终的输出CRC
var out = [];
for(var i = 0;i < origin.length;i++){
    var b = origin[i];
    if(i >= n){
        //下一步更新
        if(out[0] == "1"){
            for(var f = 0;f < n;f++){
                if(fz[f]){
                    //需要变的
                    if(out[f] == "0"){
                        origin[i - n + f] = "1";
                        out[f] = "1";
                    }else{
                        origin[i - n + f] = "0";
                        out[f] = "0";
                    }
                }
            }
        }
        //删除第一个
        out.shift();
        //从尾部注意加一个
        out.push(b);
    }else{
        out.push(b);
    }
}
var result = origin1 + out.join("").substr(-4,4);
console.log(result);