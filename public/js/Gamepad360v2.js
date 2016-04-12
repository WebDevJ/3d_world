//Please note this code below is a reffrance from the BABYLON devloper website, I tried to used this but it never worked on my project. Just want to make this clear, Leaving it here but commenting out this section. My work around was mapping the controller to my keyboard.
// so sad. 

// var xbox360pad;
// var genericpad;
// var buttonPressed = document.getElementById("buttonPressed");
// var buttonReleased = document.getElementById("buttonReleased");
// var xboxButtonPressed = document.getElementById("xboxButtonPressed");
// var xboxButtonReleased = document.getElementById("xboxButtonReleased");
// var dpadPressed = document.getElementById("dpadPressed");
// var dpadReleased = document.getElementById("dpadReleased");
// var leftStickValues = document.getElementById("leftStickValues");
// var rightStickValues = document.getElementById("rightStickValues");
// var leftTriggerValue = document.getElementById("leftTriggerValue");
// var rightTriggerValue = document.getElementById("rightTriggerValue");
// var Xbox360Section = document.getElementById("Xbox360Section");
// var startingInstructions = document.getElementById("startingInstructions");
// var padLogs = document.getElementById("padLogs");
// var GenericPadSection = document.getElementById("GenericPadSection");
// var gamepadConnected = function (gamepad) {
//     //startingInstructions.className = "hidden";
//     //padLogs.className = "";
//     if (gamepad.index === 0) {
//         /*gamepad.onleftstickchanged(function (values) {
//             leftStickValues.innerHTML = "X: " + values.x + " Y: " + values.y;
//         });
//         gamepad.onrightstickchanged(function (values) {
//             rightStickValues.innerHTML = "X: " + values.x + " Y: " + values.y;
//         });*/
//         if (gamepad instanceof BABYLON.Xbox360Pad) {
//             //Xbox360Section.className = "";
//             xbox360pad = gamepad;
//             //xbox360pad.onlefttriggerchanged(function (value) {
//                 //leftTriggerValue.innerHTML = value.toString();
//             //});
//             //xbox360pad.onrighttriggerchanged(function (value) {
//                 //rightTriggerValue.innerHTML = value.toString();
//             //});
//             xbox360pad.onbuttondown(function (button) {
//                 switch (button) {
//                     case 0:
//                         xboxButtonPressed.innerHTML = "A pressed";
//                         break;
//                     case 1:
//                         shootOK = true;//"B pressed";
//                         break;
//                     case 2:
//                         xboxButtonPressed.innerHTML = "X pressed";
//                         break;
//                     case 3:
//                         xboxButtonPressed.innerHTML = "Y pressed";
//                         break;
//                     case 5:
//                         xboxButtonPressed.innerHTML = "Back pressed";
//                         break;
//                     case 4:
//                         xboxButtonPressed.innerHTML = "Start pressed";
//                         break;
//                     case 6:
//                         xboxButtonPressed.innerHTML = "LB pressed";
//                         break;
//                     case 7:
//                         xboxButtonPressed.innerHTML = "RB pressed";
//                         break;
//                     case 8:
//                         xboxButtonPressed.innerHTML = "LeftStick pressed";
//                         break;
//                     case 9:
//                         xboxButtonPressed.innerHTML = "RightStick pressed";
//                         break;
//                 }
//             });
//             xbox360pad.onbuttonup(function (button) {
//                 switch (button) {
//                     case 0:
//                         xboxButtonReleased.innerHTML = "A released";
//                         break;
//                     case 1:
//                         shootOK = false; // "B released";
//                         break;
//                     case 2:
//                         xboxButtonReleased.innerHTML = "X released";
//                         break;
//                     case 3:
//                         xboxButtonReleased.innerHTML = "Y released";
//                         break;
//                     case 5:
//                         xboxButtonReleased.innerHTML = "Back released";
//                         break;
//                     case 4:
//                         xboxButtonReleased.innerHTML = "Start released";
//                         break;
//                     case 6:
//                         xboxButtonReleased.innerHTML = "LB released";
//                         break;
//                     case 7:
//                         xboxButtonReleased.innerHTML = "RB released";
//                         break;
//                     case 8:
//                         xboxButtonReleased.innerHTML = "LeftStick released";
//                         break;
//                     case 9:
//                         xboxButtonReleased.innerHTML = "RightStick released";
//                         break;
//                 }
//             });
//             xbox360pad.ondpaddown(function (button) {
//                 switch (button) {
//                     case 1:
//                         //dpadPressed.innerHTML = "Down pressed";
//                         break;
//                     case 2:
//                         moveleft=true; //"Left pressed";
//                         break;
//                     case 3:
//                         moveright = true;// "Right pressed";
//                         break;
//                     case 0:
//                         //dpadPressed.innerHTML = "Up pressed";
//                         break;
//                 }
//             });
//             xbox360pad.ondpadup(function (button) {
//                 switch (button) {
//                     case 1:
//                         //dpadReleased.innerHTML = "Down released";
//                         break;
//                     case 2:
//                         moveleft = false;// "Left released";
//                         break;
//                     case 3:
//                         moveright = false;// "Right released";
//                         break;
//                     case 0:
//                         //dpadReleased.innerHTML = "Up released";
//                         break;
//                 }
//             });
//         } else {
//             //GenericPadSection.className = "";
//             genericpad = gamepad;
//             genericpad.onbuttondown(function (buttonIndex) {
//                 buttonPressed.innerHTML = "Button " + buttonIndex + " pressed";
//             });
//             genericpad.onbuttonup(function (buttonIndex) {
//                 buttonReleased.innerHTML = "Button " + buttonIndex + " released";
//             });
//         }
//     }
// };
// var gamepads = new BABYLON.Gamepads(gamepadConnected);