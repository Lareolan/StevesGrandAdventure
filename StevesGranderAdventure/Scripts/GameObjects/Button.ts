/**
 * This file contains the game's Button object
 * Author:              Konstantin Koton
 * Filename:            Button.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 23, 2014
 * Revision History:
 *      v1 - Migrated file to Project 1
 */
module GameObjects {
    // Button Class
    export class Button extends createjs.Container {
        // external constants
        static RECTANGULAR: number = 1;
        static ROUNDED: number = 2;

        // internal variables
        private text: string;
        private width: number;
        private height: number;
        private textColor: string = "#000000";
        private strokeColor: string = "#000000";
        private fillColor: string = "rgba(127, 127, 127, 0.5)";
        private posX: number;
        private posY: number;
        private style: number;
        private clickHandler: Function;
        private mouseOverHandler: Function;
        private mouseOutHandler: Function;
        private buttonTimer: number;

        private buttonText: createjs.Text;
        private buttonShape: createjs.Shape;
        
        // Initializes the button object with text, shape, size, and colors
        constructor(text: string, width: number, height: number, posX: number = 0, posY: number = 0,
            style: number = Button.RECTANGULAR, textColor: string = "#000000", strokeColor: string = "#000000",
            fillColor: string = "rgba(127, 127, 127, 0.5)") {

            super();

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
        setClickHandler(handler: (eventObj: Object) => void) {
            this.addEventListener("click", handler);
        }

        // Sets this button's mouseover handler
        setMouseOverHandler(handler: (eventObj: Object) => void) {
            this.addEventListener("mouseover", handler);
        }

        // Sets this button's mouseout handler
        setMouseOutHandler(handler: (eventObj: Object) => void) {
            this.addEventListener("mouseout", handler);
        }

        // Sets mouseover and mouseout handlers to create a fading effect (A canned effect)
        setFadeEffect(): void {
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
        }
    }
} 