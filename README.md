# SprayProj
This project came to my mind from the idea of combining two things that play a large role in my life. One being coding, and the other being rock climbing. 

## How it happened
At some point in the winter of 2021, a friend and myself designed and built a wooden home-wall in my garage, completely outfitted with several climbing holds. The idea of this
home-wall, or "Spray Wall" (as we like to call it), was to use it as a training mechanism for bigger excursions on real rock. 

A typical Spray Wall session looks like this: a few friends get together in someone's garage, they decide on a series of holds and foot-holds to use in order to make it from
the bottom to the top, thus creating a "problem". The idea is to make it very difficult in order to train finger strength and train body awareness. Once every one finishes the 
chosen problem, they can agree on a difficulty grade for the chosen route. Finally, we crack a beer and reward ourselves for our training session.

This is all fine and dandy, and I've had several Spray Wall sessions where we pick a problem, do the problem, and leave it at that. However, I realized that one thing I was missing
was a way to keep track of the climbs we had come up with. There were alternative apps, but most of them required us to pay a hefty fee any time I added or removed holds from 
my wall. I decided making my own app was in my best interest. 

## How it's used
"Spray Proj" (short for Spray Project, as rock climbers typically refer to a current rock climbing goal as a "Project" or sometimes "Proj" for short), is a mobile application
that is ran locally using React Native, Expo, NodeJS, MongoDB, and Amazon S3. I can create a problem by giving it name, a difficulty, description, and an pre-edited image
that contains the holds which are highlighteds that make up the problem. I can then see my entire list of problems, sorted and grouped by difficulty, and determine whether 
or not it has been sent by a check mark indicator. (Sent is another term used by climbers which means one has finished the problem or route. In general outdoor activities, "sent"
is a good thing. I.e., "That skier sent it big off that cliff!", "Send it!", "So happy I finally sent my project :)"). I can also edit existing problems by updating it's 
name, difficulty, description, or sent status. Finally, I can delete an existing problem if I no longer think it should be in my list of problems. 

In order to run this app, I run it locally on my computer and then open Expo on my phone. I just run `expo start --lan` in order to fire up the UI, and then I run `node server.js`
in my server folder in order to fire up the BE that controls all the HTTP calls that handle data to/ from MongoDB as well as getting the correct image files from Amazon S3. 
Running it locally from my computer works completely fine because I'm always sessioning in my garage anyways! 

<img src="https://user-images.githubusercontent.com/27656191/158703210-6bb31fb4-4e0d-4e91-ae8e-9f9b10934c59.png" width="250" height="500">  <img src="https://user-images.githubusercontent.com/27656191/158704679-280c6026-1262-4bbb-b6e9-7325fbfda64d.png" width="250" height="500">  <img src="https://user-images.githubusercontent.com/27656191/158704689-76276f7e-e840-4bf6-96fa-91bc7a1fd8df.png" width="250" height="500">



Thanks for reading!
Peyton
