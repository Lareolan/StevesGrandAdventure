var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* This file contains the game's Button object
* Author:              Konstantin Koton
* Filename:            Button.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 23, 2014
* Revision History:
*      v1 - Migrated file to Project 1
*/
var GameObjects;
(function (GameObjects) {
    // Button Class
    var Button = (function (_super) {
        __extends(Button, _super);
        // Initializes the button object with text, shape, size, and colors
        function Button(text, width, height, posX, posY, style, textColor, strokeColor, fillColor) {
            if (typeof posX === "undefined") { posX = 0; }
            if (typeof posY === "undefined") { posY = 0; }
            if (typeof style === "undefined") { style = Button.RECTANGULAR; }
            if (typeof textColor === "undefined") { textColor = "#000000"; }
            if (typeof strokeColor === "undefined") { strokeColor = "#000000"; }
            if (typeof fillColor === "undefined") { fillColor = "rgba(127, 127, 127, 0.5)"; }
            _super.call(this);
            this.textColor = "#000000";
            this.strokeColor = "#000000";
            this.fillColor = "rgba(127, 127, 127, 0.5)";

            this.text = text;
            this.width = width;
            this.height = height;
            this.x = posX;
            this.y = posY;
            this.style = style;
            this.textColor = textColor;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;

            this.buttonShape = new createjs.Shape();
            this.buttonShape.graphics.beginStroke(this.strokeColor);
            this.buttonShape.graphics.beginFill(this.fillColor);
            if (this.style === Button.ROUNDED) {
                this.buttonShape.graphics.drawRoundRect(0, 0, this.width, this.height, this.height / 2);
            } else {
                this.buttonShape.graphics.drawRect(0, 0, this.width, this.height);
            }
            this.addChild(this.buttonShape);

            this.buttonText = new createjs.Text(this.text, "32px Minecrafter", "black");
            this.buttonText.textBaseline = "middle";
            this.buttonText.textAlign = "center";
            this.buttonText.x = this.width / 2;
            this.buttonText.y = this.height / 2;
            this.addChild(this.buttonText);
        }
        // Set this button's click handler
        Button.prototype.setClickHandler = function (handler) {
            this.addEventListener("click", handler);
        };

        // Sets this button's mouseover handler
        Button.prototype.setMouseOverHandler = function (handler) {
            this.addEventListener("mouseover", handler);
        };

        // Sets this button's mouseout handler
        Button.prototype.setMouseOutHandler = function (handler) {
            this.addEventListener("mouseout", handler);
        };

        // Sets mouseover and mouseout handlers to create a fading effect (A canned effect)
        Button.prototype.setFadeEffect = function () {
            var buttonFade = "down";
            var btn = this.buttonShape;
            var buttonTimer = this.buttonTimer;

            var color = new createjs.ColorFilter(1, 1, 1, 1);
            btn.filters = [color];
            btn.cache(0, 0, this.width, this.height);

            function mouseOver() {
                buttonTimer = setTimeout(timerTick, 200);

                function timerTick() {
                    if (buttonFade === "down") {
                        btn.alpha -= 0.025;
                        if (btn.alpha <= 0.4) {
                            buttonFade = "up";
                        }
                    } else {
                        btn.alpha += 0.025;
                        if (btn.alpha >= 1) {
                            buttonFade = "down";
                        }
                    }
                    btn.updateCache();
                    buttonTimer = setTimeout(timerTick, 50);
                }
            }

            function mouseOut() {
                btn.alpha = 1;
                btn.updateCache();
                clearTimeout(buttonTimer);
            }

            this.setMouseOverHandler(mouseOver);
            this.setMouseOutHandler(mouseOut);
        };
        Button.RECTANGULAR = 1;
        Button.ROUNDED = 2;
        return Button;
    })(createjs.Container);
    GameObjects.Button = Button;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Button.js.map
