var sha1 = function(){
    var up_low_case = 0; 

    function sha1(s) {

        return bin2_to_hex(sha1_main(str_to_arr(s)));

    }

    function sha1_main(str_data_array) {

        var x = str_data_array; 
        var w = Array(80);

        var a = 1732584193;

        var b = -271733879;

        var c = -1732584194;

        var d = 271733878;

        var e = -1009589776;

       return compress(x, w, a, b, c, d, e);

    }

    function compress(x, w, a, b, c, d,e){
        for (var i = 0; i < x.length; i += 16) 
            {

                var old_a = a;

                var old_b = b;

                var old_c = c;

                var old_d = d;

                var old_e = e;

                for (var t = 0; t < 80; t++) 
                {
                    if (t < 16)  
                        w[t] = x[i + t]; 

                
                    else  
                        w[t] = S_rol(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 1);
                       

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

            return new Array(a, b, c, d, e); 
    }



    function sha1_F(t, b, c, d) {

        if (t < 20)
            return (b & c) | ((~b) & d);

        if (t < 40)
            return b ^ c ^ d;

        if (t < 60)
            return (b & c) | (b & d) | (c & d);

        return b ^ c ^ d; 
    }


    function sha1_K(t) {

        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;

    }

    function Mod2_add(x, y) {

        var lsw = (x & 0xFFFF) + (y & 0xFFFF);

        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);

        return (msw << 16) | (lsw & 0xFFFF);

    }

    function S_rol(num, cnt) {

        return (num << cnt) | (num >>> (32 - cnt));

    }

    function str_to_arr(str) {

       
        var nblk = ((str.length + 8) >> 6) + 1,  
            blks = new Array(nblk * 16);

        for (var i = 0; i < nblk * 16; i++)
            blks[i] = 0;

        for (i = 0; i < str.length; i++)

           

            blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8); 


        blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);  

        blks[nblk * 16 - 1] = str.length * 8;

        return blks;

    }

    function bin2_to_hex(binarray) {

        var hex_table = up_low_case ? "0123456789ABCDEF" : "0123456789abcdef";

        var str = "";


        for (var i = 0; i < binarray.length * 4; i++) {


            str += hex_table.charAt( (binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF ) +

                hex_table.charAt( (binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF );

        }

        return str;

    }

    return sha1;

}();