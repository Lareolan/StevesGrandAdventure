/**
 * This file contains the class for the game's map layers
 * Author:              Konstantin Koton
 * Filename:            MapEntities.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
 */
module GameObjects {
    // Layer Class
    export class Layer {
        // Instance variables
        data: Array<number>;
        name: string;
        width: number;
        height: number;

        constructor() {
        }

        /*
         * This function takes in a jQuery object containing layer information, parses
         * it and stores it in internal variables.
         */
        fromXML($layer) {
            this.name = $layer.attr("name");
            this.width = parseInt($layer.attr("width"));
            this.height = parseInt($layer.attr("height"));
            this.data = this.getData($layer.find("data:first"));
        }

        /*
         * This function parses the base64 encoded and zlib compressed layer data, and returns
         * an array of raw tilemap data.
         */
        getData($data): Array<number> {
            var encoding = $data.attr("encoding");
            var compression = $data.attr("compression");
            var bytes = $.trim($data.text());

            if (encoding) {
                if (encoding == "base64") {
                    bytes = Base64Decode(bytes);
                }
            }

            if (compression) {
                if (compression == "zlib") {
                    bytes = new Zlib.Inflate(bytes).decompress();
                    return this.flipGlobalIDs(bytes);
                }
            }

            return null;
        }

        // A utility function that parses all the data and decodes an array of bytes into
        // an array of 32 bit integers.
        flipGlobalIDs(data): Array<number> {
            var flippedGlobalIds = [];
            for (var n = 0; n < data.length; n += 4) {
                var flippedGlobalId = 0;
                flippedGlobalId += data[n + 0];// << 0;
                flippedGlobalId += data[n + 1] << 8;
                flippedGlobalId += data[n + 2] << 16;
                flippedGlobalId += data[n + 3] << 24;
                flippedGlobalIds.push(flippedGlobalId);
            }
            return flippedGlobalIds;
        }
    }
} 