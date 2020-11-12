# Lumen
A unique visual identity (Lumen IDs) for each participant attending the ValueLabs DI Conference on Nov 28, 2020.

## Concept
The idea of Dynamic Branding lies at the interaction of Computational Art, Generative Design and Creative Coding. It is an extension of the role of computer codes From a traditional instruction giving paradigm to defining visual and spatial structures.

This blended technique, which is based on programming and particularly on an algorithm, enables the designer to create a graphic system of rules that will generate numerous results respectively, based on each attendee’s details.

Lumen, a product of exploration in this realm, is an generative algorithm that converts data collected from the individuals at DI conference 2020, into unique, organic and personalised visual assets that are manifested as attendee takeaways like ID cards, Zoom backgrounds, etc.

1. **Data Collection** : The data is submitted by the participant is transformed in an organic form, in digital format. The form captures the ‘distinctive profile’ of the participants.

2. **Visual Library** : Data from the registration information is parsed using javascript graphic library [P5.js](https://p5js.org/).

3. **Shape Logic** : Using the number of the letters in the name of an individual and their relative positioning in the the English alphabet sequence, curved vertices are distributed radially on the image and canvas and the resultant shape is formed. The curve tightness of the shape adjusted with the length of characters in the name.

Know more about generative design and creative coding here:
1. _Form+Code in Design, Art, and Architecture_ by Chandler Casey Reas
2. _Generative Design: Visualize, Program, and Create with Processing_ by Hartmut Bohnacker
3. _The Nature of Code: Simulating Natural Systems with Processing_ by Daniel Shiffman

## Other Links

You can play with the test code here:
https://editor.p5js.org/sarweshshah/full/F4SPgdMbY

The program essentially takes registered participant's name as input and dynamically creates a unique image for each one of them.
The code currently pulls its data from a mock csv file.

Sample Lumen ID Card | Skeleton View of a Lumen
-- | --
![](https://github.com/sarweshshah/lumen-id/blob/main/sample/kiran.png) | ![](https://github.com/sarweshshah/lumen-id/blob/main/sample/skeleton.gif)
