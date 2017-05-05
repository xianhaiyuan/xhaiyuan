var sha1 = function(){
    var up_low_case = 0;  //初始化最后的输出结果为大写字母还是小写字母,0为小写，1为大写
    /*
     *
     * 主函数
     *
     */
    function sha1(s) {

        return bin2_to_hex(sha1_main(str_to_arr(s)));

    }

    /*
     *
     * 测试
     *
     */
    function sha1_test() {

        // return sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
        return sha1("中文中文中文中文中文中文中文");
        //注：JavaScript中文用的是utf-16编码，如果用其他语言，要同一编码才能得到相同的结果。

    }

    /*
     *
     * 算法实现核心函数
     *
     */
    function sha1_main(str_data_array) {

        var x = str_data_array; // 将x填充到w里
        var w = Array(80);

        //5个32位表示的寄存器，原十六进制，现转成十进制表示
        var a = 1732584193;

        var b = -271733879;

        var c = -1732584194;

        var d = 271733878;

        var e = -1009589776;

       return compress(x, w, a, b, c, d, e);

    }

    /*
     *
     * SHA1的压缩函数，由80步组成
     *
     */

    function compress(x, w, a, b, c, d,e){
        for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
            {

                //先保存原始寄存器的数值。
                var old_a = a;

                var old_b = b;

                var old_c = c;

                var old_d = d;

                var old_e = e;

                for (var t = 0; t < 80; t++) // 对每个512位进行80步操作
                {
                    //前16步处理中，W的值等于分组中对应字的值，余下的64步W的值由4个前面的W值异或之后再循环左移一位得出
                    if (t < 16)  //前16步
                        w[t] = x[i + t]; 

                    //从x数组中依次地每次将4*8=32比特（4个字符）的信息存到w数组里，即第二层的循环中(t的循环)每次拿4个字符的信息存到w数组里。

                    //x[i]数组从前到后，第一次：w[0]=x[0],w[1]=x[1]...,w[15]=x[15];第二次：w[0]=x[16],w[1]=x[17]...,w[15]=x[31];即最外层的每次循环（x.length的循环)依次地拿512比特的str字符串信息存到w数组里

                    else  //后64步
                        w[t] = S_rol(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 1);
                        //将w[t]的前3个数，前8个数，前14个数，前16个数做异或运算之后得到的值为num，将num传进S_rol函数做运算后得到的值，即为w[t]的值
                        //此处S_rol函数作用为循环左移，将第一个参数的值分别左移一位，右移31位再将这两个数做|运算，组成一个32位二进制数

                    //Mod2_add作用为模2^32相加，此处为5个字以模2^32相加（循环左移了5个字）

                    //a,b,c,d,e <- ( e+f(t,b,c,d)+S_rol(a,5)+w+k ),a,S_rol(b,30),c,d  （此处为压缩函数）

                    var tmp = Mod2_add( Mod2_add(S_rol(a, 5), sha1_F(t, b, c, d)), Mod2_add(Mod2_add(e, w[t]), sha1_K(t)) );

                    e = d;
                    d = c;
                    c = S_rol(b, 30);
                    b = a;
                    a = tmp;

                }

                a = Mod2_add(a, old_a);
                b = Mod2_add(b, old_b);
                c = Mod2_add(c, old_c);
                d = Mod2_add(d, old_d);
                e = Mod2_add(e, old_e);

            }

            return new Array(a, b, c, d, e); //abcde分别代表5个32位的二进制数，即160比特的消息摘要，转换为16进制，即40个十六进制数
    }


    /*
     *
     * 为循环创建逻辑函数，4个不同的原始逻辑函数，返回对应F函数的值，与4个加法常量Kt相对应
     *
     */
    function sha1_F(t, b, c, d) {

        if (t < 20)
            return (b & c) | ((~b) & d);

        if (t < 40)
            return b ^ c ^ d;

        if (t < 60)
            return (b & c) | (b & d) | (c & d);

        return b ^ c ^ d; // t<80
    }

    /*
     *
     * 为循环提供加法常量返回对应的Kt值
     *
     */
    function sha1_K(t) {

        //迭代次数0<=t<=19  SHA的加法常量Kt = 1518500249（十进制），5A827999（十六进制）

        //迭代次数20<=t<=39  SHA的加法常量Kt = 1859775393（十进制），6ED9EBA1（十六进制）

        //迭代次数0<=t<=19  SHA的加法常量Kt = -1894007588（十进制），FFFFFFFF8F1BBCDC（十六进制）

        //迭代次数0<=t<=19  SHA的加法常量Kt = -899497514（十进制），FFFFFFFFCA62C1D6（十六进制）

        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;

    }

    /*
     *
     * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
     *
     */
    function Mod2_add(x, y) {

        var lsw = (x & 0xFFFF) + (y & 0xFFFF);//将x变成32位，有数字的保留，0和空位用0表示，y也一样

        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);  //右移16位相加（除以2^16后相加)

        return (msw << 16) | (lsw & 0xFFFF);

    }

    /*
     *
     * 32位二进制数循环左移（将num这个数分别左移cnt位，右移32 - cnt位再将这两个数做|运算，组成一个32位二进制数）
     *
     */
    function S_rol(num, cnt) {

        return (num << cnt) | (num >>> (32 - cnt));

    }

    /*
     *
     * 将输入的字符串转换为二进制数，按每512比特填充到数组里
     *
     */
    function str_to_arr(str) {

        //注：js一个数字和字母长度为8比特，一个汉字长度为16比特
        /*  如果字符串长度+8个字符串长度（用来存储标记和字符串长度占的空间）超过了512比特，就分配多一个16个数组长度的空间，即512比特大小的空间，字符串长度+8个字符串长度不够512比特则分配512比特的空间。意思即消息按512比特大小进行分组  */
        // 2^6=64,8*64=512.str.length=57时，nblk = 2,nblk表示为有多少个512比特，即有多少组
        var nblk = ((str.length + 8) >> 6) + 1,  //此处的加的8个长度就是用来存储标记（用来分隔字符串信息和字符串长度信息）和字符串的长度（记录str有多少比特）
            blks = new Array(nblk * 16);

        // blkd[0-15]

        //此处可以存16个32位的二进制数，即512比特。

        //首先将全部填充为0
        for (var i = 0; i < nblk * 16; i++)
            blks[i] = 0;

        for (i = 0; i < str.length; i++)

            //取出第一个字符（8位），左移24位，得到一个32位长度的空间（表示形式实际为32位二进制数，而在程序中为十进制数），其中前8位存储第一个字符串的ASCII码值。
            //取出第二个字符（8位），左移16位，得到一个24位长度的空间，其中前8位存储第一个字符串的ASCII码值。
            //上面两个数做与运算，结果是，将第一个字符的ASCII码值保存在32位数的前8位，第二个字符的ASCII码值保存在接下来的8位，以此类推，blks[0]里存着的是一个32位二进制数（里面保存这前4个字符的ASCII码值），而这个数实际是十进制表示的（自动转化成了十进制）。这样就把这个字符串保存在了blks这个数组里。

            blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8); //左移 24 16 8 0 24 16 8 0循环


        blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);  //ASCII码最大为0x7E，此处用ox80作标记，ox80前面部分表示存储的字符串，后面表示字符串长度。

        blks[nblk * 16 - 1] = str.length * 8;

        return blks;

    }

    /*
     *
     * 将5个32位二进制数（共160比特）转换成40个十六位进制数
     *
     */
    function bin2_to_hex(binarray) {

        var hex_table = up_low_case ? "0123456789ABCDEF" : "0123456789abcdef";

        var str = "";

        //charAt() 返回指定下标的字符

        for (var i = 0; i < binarray.length * 4; i++) {

            //此处将abcde 5个32位的二进制数转换成40个十六进制的数。
            //转换过程如下：第一个数为例，第一次循环binarray[i >> 2]表示i=0到3取的都是binarray[0]，binarray[0]==a，右式的第一项表示右移28位，于是取得32位中的前4位，转换为十进制后在hex_table里找到的对应的十六进制数字；第二项表示右移24位，于是取得32位中的前8位，做& 0xF运算后去掉前面的位数，保留后4位，转换为十进制后在hex_table里找到的对应的十六进制数字。一次循环得到2个十六进制数字，以此类推，20次循环最后得到40位十六进制数字，即160比特的二进制数据。

            str += hex_table.charAt( (binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF ) +

                hex_table.charAt( (binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF );

        }

        return str;

    }

    return sha1;

}();