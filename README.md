# Conveyor Belt

This Node program calculates the number of widgets produced by workers at a conveyor belt, and the number of remaining components that were not combined to create a widget.

## Challenge Description

There is a factory production line around a single a conveyor belt.  

Components (of type A and B) come onto the start of the belt at random 
intervals; workers must take one component of each type from the belt 
as they come past, and combine them to make a finished product.

The belt is divided into fixed-size slots; each slot can hold only one 
component or one finished product.  There are a number of worker 
stations on either side of the belt, spaced to match the size of the 
slots on the belt, like this (fixed-width font ASCII pic):

```
       v   v   v   v   v          workers
     ---------------------
  -> | A |   | B | A | P | ->     conveyor belt
     ---------------------
       ^   ^   ^   ^   ^          workers
```

In each unit of time, the belt moves forwards one position, and there 
is time for a worker on one side of each slot to EITHER take an item 
from the slot or replace an item onto the belt.  The worker opposite 
them can't touch the same belt slot while they do this.
(So you can't have one worker picking something from a slot while 
their counterpart puts something down in the same place).

Once a worker has collected one of both types of component, they can
begin assembling the finished product.  This takes an amount of time, 
so they will only be ready to place the assembled product back on the 
belt on the fourth subsequent slot.  While they are assembling the 
product, they can't touch the conveyor belt.  Workers can only hold 
two items (component or product) at a time: one in each hand.

Create a simulation of this, with three pairs of workers.  At each 
time interval, the slot at the start of the conveyor belt should have 
an equal (1/3) chance of containing nothing, a component A or a 
component B.

Run the simulation for 100 steps, and compute how many finished 
products come off the production line, and how many components of each 
type go through the production line without being picked up by any 
workers.

## My approach

My plan is to create 3 classes:
- ConveyorBelt, which has slots that are either empty, or filled with a type A or B component.
- Worker, which takes components from the ConveyorBelt and assembles them into widgets.
- ProductionLine, which pulls the other objects together and performs actions on them.

Some important logical notes:
- Each class has a `tick()` method, which advances 'time' in the context of this challenge, and performs the necessary actions in that tick.
- Workers are divided into pairs, and each worker in a pair cannot perform an action *if their pair has done so in that tick*.
- 
