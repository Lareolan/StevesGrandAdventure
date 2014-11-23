/*
 * Copyright 2013 Cameron McKay
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Base64Decode = function (str) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var last1 = alphabet.indexOf(str.charAt(str.length - 1));
    var last2 = alphabet.indexOf(str.charAt(str.length - 2));

    var length = (str.length / 4) * 3;
    if (last1 == 64) length--; //padding chars, so skip
    if (last2 == 64) length--; //padding chars, so skip

    var bytes = [];
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var j = 0;

    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    for (i = 0; i < length; i += 3) {
        //get the 3 octets in 4 ascii chars
        enc1 = alphabet.indexOf(str.charAt(j++));
        enc2 = alphabet.indexOf(str.charAt(j++));
        enc3 = alphabet.indexOf(str.charAt(j++));
        enc4 = alphabet.indexOf(str.charAt(j++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        bytes[i] = chr1;
        if (enc3 != 64) bytes[i + 1] = chr2;
        if (enc4 != 64) bytes[i + 2] = chr3;
    }

    return bytes;
};