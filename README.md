# Conveyor Belt

This Node program calculates the number of widgets produced by workers at a conveyor belt, and the number of remaining components that were not combined to create a widget.

## Challenge Description

The challenge is to simulate a production line, including the conveyor belt and its workers. Time passes in the form of ticks, and actions happen with each tick. Each `slot` on the conveyor belt can either hold an `A` or `B` component, or be empty. Workers (in pairs) on either side of the belt can pick up exactly one of each component, then assemble a widget over 
the duration of four ticks. Once they have finished assembling, they can place the completed widget back on an empty space on the conveyor belt.

The end result must be to calculate the number of completed widgets, and the number of components that were not picked up, for 100 ticks.

Important logical notes:
- There is a random 1/3 chance of each type of conveyor belt slot appearing (`A`, `B` or empty).
- A conveyor belt slot cannot hold a widget at the same time as a component.
- Workers can only hold one component in each hand.
- Workers cannot touch the conveyor belt while assembling a widget.
- Workers can only take a component or place a widget *if their paired worker has not already done so*.

## My approach

I created 3 classes:
- ConveyorBelt, which has slots that are either empty, or filled with a type A or B component.
- Worker, which takes components from the ConveyorBelt and assembles them into widgets.
- ProductionLine, which pulls the other objects together and performs actions on them.

I also wrote a short `runSimulation` script, which executes 100 ticks of time then outputs the total widgets and unused components to the console.

I used Node.js for this challenge, using ES6 class syntax. I used Mocha, Chai, and Sinon for testing and stubbing, and [proxyquire](https://github.com/thlorenz/proxyquire) to mock class dependencies. I used ESLint for linting, and used Babel to compile my code.

I adopted a TDD and OOD approach for this challenge. I could have gone further with the OOD aspect (high number of small independent classes), but the challenge specifies not to spend too long on creating extremely flexible code.

## Installation and use

To install this project:
- Clone the repository
- `npm install` to install local dependencies
- `npm test` to run tests
- `npm start` to compile & run the `runSimulation` script (results will be displayed in the console).
