# <img src="https://i.imgur.com/zbU8s94.png" width=100> GA SEI 60 Project Three - PLACEBOOK README

[Overview](#overview "Goto overview") |
[Brief](#brief "Goto brief") |
[Timeframe](#timeframe "Goto timeframe") |
[Technologies used](#technologies-used "Goto technologies-used") |
[Deployment](#deployment "Goto deployment") |
[Getting Started](#getting-started "Goto getting started") |
[Approach](#approach "Goto approach") |
[Planning](#planning "Goto planning") |
[Build](#build "Goto build") |
[Backend](#backend "Goto backend")

[Frontend](#frontend "Goto frontend")


[Countries Index Page](#countries-index-page "Goto countries-index-page") |
[Country Show](#country-show "Goto country-show") |


[Challenges](#challenges "Goto challenges") |
[Wins](#wins "Goto wins") |
[Bugs](#bugs "Goto bugs") |
[Key Learnings](#key-learnings "Goto key-learnings") |
[Future Content and Improvements](#future-content-and-improvements "Goto future-content-and-improvements")

![demo app](/rmassets/home.png)

## Overview:
Placebook is full-stack app focused on travel and memories. Users would be able to create trips, and upload their own unique memories (photos with notes). The aim of this app is to allow like minded travellers to document and share their memories to this community.
<br></br>
This was a one-week group project built in collaboration with [**Duncan Browne**](https://github.com/DBBrowne/) and [**Mike Salter**](https://github.com/Msalter91/). 


## Brief:
* Build a MERN full-stack application - by making your own backend and your own front-end
* Use an Express API - to serve data from a Mongo database
* Consume your API with a separate front-end - built with React
* Be a complete product - which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes - that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design - to kick your portfolio up a notch and have something to wow future clients & employers
* Be deployed online** so it's publicly accessible
​
## Timeframe:
* 1 week

## Technologies used:

* Frontend:\
React.js | JavaScript | Axios | CSS & Sass | Bootstrap 5.0

* Backend:\
MongoDB | Mongoose | Express | Node.js | Insomnia

* Dev Tools:\  
Git | GitHub | MapBox | Miro | Cloudinary | Photopea | Inkscape

## Deployment:
This app has been deployed on Netlify and can be found [**here**](https://placebookapp.netlify.app/ "here")


<!-- ## Getting Started:
Use the clone button to download the app source code. 

* Using NPM:\
`npm run start` or `npm run dev` to run the development server
`npm run build` to create a build directory

* To prevent the `failed-to-compile` issue for linter errors like `no-unused-vars`, rename the `.env.example` to `.env` and restart your development server. Note this will only change the behaviour of certain linter errors to now be warnings, and is added just to allow your code to compile in development. These errors should still be fixed and other errors will still result in the code being unable to compile -->

## Approach:

### Planning:
On meeting up with the other team members for this project, we initially shared our individual ideas on Zoom and sketched visuals on Miro (shared access). On deciding to make an app for travel & memories we planned out a wireframe to identify models needed for this project.

![modelwireframe](/rmassets/wireframe.png)

Next came the page end points, again visualised by buiilding on Miro. Planning on a Miro was very helpful as a return point whilst working to stay visually aware of the continuous build over the coming days.
Since it was our first time working together, we had daily standups every morning to discuss each of our areas of work and to discuss any concerns encountered. The Miro board was a great way also to pin any issues / additional ideas back to the team.

**** ADD IMAGES OF PAGE SKETCHES

## Build:
We began by setting up our Frontend and Backend files together coding along on zoom to ensure the initial set up of known dependancies were correctly installed.

We initially split our roles into three areas. I focused on frontend setup of pages, navbar and design/branding. Mike worked into building the models and general functionality of the Backend and Duncan focused on implementing a suitable map into the site as well as creating trips/memories functionality. 

## Backend:
Our backend consists of four models:

#### Country Model
```js
const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  countrycode: { type: String, required: true },
  summary: { type: String, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
})
```
#### Trip Model

```js
const tripSchema = new mongoose.Schema({
  title: { type: String, maxlength: 50 },
  notes: { type: String, maxlength: 300 },
  countryVisited: { type: String },
  dateStarted: { type: String },
  dateFinished: { type: String },
  memories: [{ type: mongoose.Schema.ObjectId, ref: 'Memory' }],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  ```

#### Memory Model
  ```js
  const memorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  location: { type: String, required: true, maxlength: 30 },
  image: { type: String },
  notes: { type: String, maxlength: 200 },
  lat: { type: Number, required: true  },
  long: { type: Number, required: true },
  visitDate: { type: String },
  pairedTrip: { type: mongoose.Schema.ObjectId, ref: 'Trip' },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
},
{ timestamps: { createdAt: 'created_at' } }
)
```

#### User Model
```js
const userSchema = new mongoose.Schema({
displayName: { type: String, required: true },
email: { type: String, required: true, unique: true },
firstName: { type: String, maxlength: 30 },
surname: { type: String, maxlength: 30 },
location: { type: String },
password: { type: String, required: true },
image: { type: String, required: true, default: 'URL for blank display pic goes here' },
about: { type: String, maxlength: 300 },
trips: [{ type: mongoose.Schema.ObjectId, ref: 'Trip' }],
memories: [{ type: mongoose.Schema.ObjectId, ref: 'Memory' }],  
})
```
Using Mongoose’s relationships, we were able to reference the other models and populate these fields when needed. This was particularly useful in creating our trip/memory relationship.


#### 
The purpose of this site is to allow users to upload their memories to be visable to all. 

## Router:
 This file defines each of the pages accessibility and decides which requests would require a user to be logged in (secure route).

 The app is mostly publicly accessible to everyone (home page, countries index page, country show page, trips index page, trips show page, memories index, memory show) however anything profile related with the power to create / edit / delete would require user authentication.  

```js
const router = express.Router()

// Countries
router.route('/countries')
  .get(countries.index)

router.route('/countries/:countryId')
  .get(countries.show)

// Trips
router.route('/trips')
  .post(secureRoute , trips.create)
  .get(trips.index)

router.route('/trips/:tripId')
  .delete(secureRoute, trips.delete)
  .get(trips.show)
  .put(secureRoute, trips.edit)

// Memories 
router.route('/memories')
  .post(secureRoute, memories.create)
  .get(memories.index)

router.route('/memories/:memoryId')
  .delete(secureRoute, memories.delete)
  .get(memories.show)
  .put(secureRoute, memories.edit)

//Users
router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/profile/:userId')
  .get(users.display)
// requires handling admin permissions before enabling:
// .put(secureRoute, users.edit)

router.route('/profile')
  .get(secureRoute, users.display)
  .put(secureRoute, users.edit)

export default router
```

Secure routes grant access only to those have successfully log in. When a user logs in successfully, user tokens (which have limited time expiry) would be assigned to the userId to allow secure route paths to be accessed. In the event of no token, the Backend would throw a 401 unauthorized error.

```js
export default function errorHandler (err, req, res, next) {
  if (err.name === 'CastError' || err.name === 'NotFound') {
    return res.status(404).json({ message: 'Cannot find that' })
  }

  if (
    err.name === 'Unauthorized' ||
    err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError'
  ){
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (err.name === 'ValidationError') {
    const customErrors = {} 

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }
    return res.status(422).json({ 
      message: 'Invalid data', 
      errors: customErrors, 
    })
  }
  next(err)
}
```



## FrontEnd:

## Countries Index Page:
## Country Show Page:

 

## Challenges:
* Working on a shared Github file
* Merge conflicts 
* Using new technologies (Map), Maps is out of my comfort zone
* Bootstrap 5.0 took a little bit of getting used to

## Wins:
* A professional looking app which is mobile responsive
* Covering a lot of ground over the course of 1 week I'm very happy that we have managed to build a full-stack app that conveys what we initially set out to do.

## Bugs:
* Deployed app 'Inspire Me' correctly shows country index, but when clicking into a individual country, the page breaks.
* Deployed app is unable to Login (throwing a 401 unauthorized)
* Deployed app is unable to see profile of user (as login required)
* Deployed app is unable to edit profile of user (as login required)
* Deployed app is unable to create trip / memory (as login required)
* Maps - although is functioning is throwing errors on console log

## Key Learnings:
* To set clear MVP deadlines and 
* Working as a team using a shared Git repository
* add & commit often and communicate on every push
* I am happy with this app, but in hindsight, I feel that the scope of this project was probably too much (we were working on this project right up to the deadline and didn't allow enough time to properly debug/iron out issues)
* Working with Mike and Duncan helped me understand the importance of communication and collaboration within a team
* If ever I need to use Maps going forward, avoid google maps

## Future Content and Improvements:
* Its easy to suggest things to add (i.e, liking photos/memories, perhaps comment features) - however I think that any chance to revisit would be to prioritise ironing out bugs to allow all page functionality and then improve on usability of app
* General aethetics ok, but maybe pages that have maps need simplifying or update to layout to make the user experience more streamlined.
* Improve user navigation experience, I feel that for someone who has never used the site before may struggle with what order to do things. Such as a user wanting to upload memories (photos), they would first need to create a trip, fill in details, pick a country, and save the trip. Then upload photo, fill in form, finetune location on map, and then save the memory
 
----


# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #3: A MERN Stack App
​
## Overview
​
**You’ve come a long way, and it's time to show it.** This will be your most advanced project to date. It is __IMPORTANT__ to note that when we say _advanced_, the project doesn't necessarily need to have lots more functionality.
​
This project will be working in groups of 3/4, set by the instructional teams.
​
**Remember:** simple code is stable code, so always favour refactoring and bug fixing over adding more functionality.
​
With this in mind, you need to be smart about how you plan, limit your project scope to be achievable (in terms of functionality) and focus on quality rather than quantity.
​
Make sure you review your project proposal with your instructor so you can make sure it's **something you can accomplish in the limited time we have**.
​
---
​
## Technical Requirements
​
You must:
​
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
​
---
​
## Necessary Deliverables
​
* A **working app** hosted on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
* **A `readme.md` file** with:
    * An embedded screenshot of the app
    * Explanations of the **technologies** used
    * A couple paragraphs about the **general approach you took**
    * **Installation instructions** for any dependencies
    * Link to your **user stories/wireframes** – sketches of major views / interfaces in your application
    * Link to your **pitch deck/presentation** – documentation of your wireframes, user stories, and proposed architecture
    * Descriptions of any **unsolved problems** or **major hurdles** you had to overcome
​
---
​
## Suggested Ways to Get Started
​
* **Don’t get too caught up in too many awesome features** – simple is always better. Build something impressive that does one thing well.
* **Design first.** Planning with user stories & wireframes before writing code means you won't get distracted changing your mind – you'll know what to build, and you can spend your time wisely by just building it.
* **Don’t hesitate to write throwaway code** to solve short term problems.
* **Read the docs for whatever technologies / frameworks / API’s you use**.
* **Write your code DRY** and **build your APIs RESTful**.
* **Be consistent with your code style.** You're working in teams, but you're only making one app per team. Make sure it looks like a unified effort.
* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
* **Keep user stories small and well-defined**, and remember – user stories focus on what a user needs, not what development tasks need accomplishing.
* **Write code another developer wouldn't have to ask you about**. Do your naming conventions make sense? Would another developer be able to look at your app and understand what everything is?
* **Make it all well-formatted.** Are you indenting, consistently? Can we find the start and end of every div, curly brace, etc?
* **Comment your code.** Will someone understand what is going on in each block or function? Even if it's obvious, explaining the what & why means someone else can pick it up and get it.
* **Write pseudocode before you write actual code.** Thinking through the logic of something helps.
​
---
## Sign Off Requirments
​
* **A Simple Wireframe** of the front end of the application, this should take into account the user flow through the app, eg, what can logged in users see/not see.
* **A plan for what models/resources** that is needed for the back end application and what the relationships between these will be
* **A great group name**