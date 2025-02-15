
# <img src="https://i.imgur.com/zbU8s94.png" width=100> GA SEI 60 Project Three - PLACEBOOK README

[Overview](#overview "Goto overview") |
[Brief](#brief "Goto brief") |
[Timeframe](#timeframe "Goto timeframe") |
[Technologies used](#technologies-used "Goto technologies used") |
[Deployment](#deployment "Goto deployment") |
[Approach](#approach "Goto approach") |
[Planning](#planning "Goto planning") |
[Build](#build "Goto build") |
[Work Split](#work-split "Goto work split") |
[Backend](#backend "Goto backend") |
[Router](#router "Goto router") |
[Seeding Data](#seeding-data "Goto seeding data") |
[Frontend](#frontend "Goto frontend") |
[Home Page](#home-page "Goto home page") |
[Nav Bar](#nav-bar "Goto nav bar") |
[About Us](#about-us "Goto about us") |
[Inspire Me](#inspire-me "Goto inspire me") |
[Show Country Page](#show-country-page "Goto show country page") |
[Create a Trip](#create-a-trip "Goto create a trip") |
[Create Memories](#create-memories "Goto create memories") |
[Mapbox](#mapbox "Goto mapbox") |
[See Trips](#see-trips "Goto see trips") |
[Register and Login](#register-and-login "Goto register and login") |
[Profile](#profile "Goto profile ") |
[Edit Profile](#edit-profile "Goto edit profile") |
[Profile with memories](#profile-with-memories "Goto profile with memories") |
[Single Memory view](#single-memory-view "Goto single memory view ") |
[Challenges](#challenges "Goto challenges") |
[Wins](#wins "Goto wins") |
[Bugs](#bugs "Goto bugs") |
[Key Learnings](#key-learnings "Goto key-learnings") |
[Future Content and Improvements](#future-content-and-improvements "Goto future-content-and-improvements")

## Overview:
Placebook is a full-stack app focused on travel and memories. Users would be able to create trips, and upload their own unique memories (photos with notes). The aim of this app is to allow like minded travellers to document and share their memories to this community.
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
React.js | JavaScript | Axios | CSS & Sass | Bootstrap 5.0 | React-Bootstrap

* Backend:\
MongoDB | Mongoose | Express | Node.js | Insomnia

* Dev Tools:\  
Git | GitHub | MapBox | Miro | Cloudinary | Photopea | Inkscape

## Deployment:
This app has been deployed on Netlify and can be found [**here**](https://placebookapp.netlify.app/ "here")

## Approach:

### Planning:
On meeting up with the other team members for this project, we initially shared our individual ideas on Zoom and sketched visuals on Miro (shared access). On deciding to make an app for travel & memories we planned out a wireframe to identify models needed for this project.

![modelwireframe](/rmassets/wireframe.png)

Next came the page end points, again visualised by building on Miro. Planning on a Miro was very helpful as a return point whilst working to stay visually aware of the continuous build over the coming days.
Since it was our first time working together, we had daily standups every morning to discuss each of our areas of work and to discuss any concerns encountered. The Miro board was a great way also to pin any issues / additional ideas back to the team.

**** ADD IMAGES OF PAGE SKETCHES

## Build:
We began by setting up our Frontend and Backend files together, coding along on Zoom to ensure the initial setup of known dependencies were correctly installed.

## Work Split:
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

### Router:
 This file defines each of the pages accessibility and decides which requests would require a user to be logged in (secure route).

 The app is mostly publicly accessible to everyone (home page, countries index page, country show page, trips index page, trips show page, memories index, memory show) however, anything profile related with the power to create / edit / delete would require user authentication.  

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

Secure routes grant access only to those who have successfully logged in. When a user logs in successfully, user tokens (which have limited time expiry) would be assigned to the userId to allow secure route paths to be accessed. In the event of no token, the Backend would throw a 401 unauthorized error.

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

### Seeding Data: 
206 countries would ideally be pre-populated with data and images.
However, as this was our own backend, it was a very long process which was a poor use of time (I surrendered after doing about 40 countries). The summary and additional information was obtained and edited from Wikipedia. Each country's image was sourced from the web and stored into imgur. 

An example of data for one country below...

```js
  {
    name: 'Japan',
    countrycode: 'JPN',
    image: 'https://i.imgur.com/iXOULiL.jpg?2',
    summary: 'The capital of Japan is Tokyo, Japan (Japanese: 日本, Nippon or Nihon, and formally 日本国) is an island country in East Asia. It is situated in the northwest Pacific Ocean, and is bordered on the west by the Sea of Japan, while extending from the Sea of Okhotsk in the north toward the East China Sea and Taiwan in the south.  Japan is a part of the Ring of Fire, and spans an archipelago of 6852 islands covering 377,975 square kilometers (145,937 sq mi); the five main islands are Hokkaido, Honshu (the "mainland"), Shikoku, Kyushu, and Okinawa. Tokyo is the nation\'s capital and largest city; other major cities include Yokohama, Osaka, Nagoya, Sapporo, Fukuoka, Kobe, and Kyoto.',  
    language: 'Japanese',
    currency: 'Yen',
  },
```

## FrontEnd:
My main role in this project was on the Frontend. I began this process by setting up the routes so that the main pages could be built.

```js
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/aboutus"><AboutUs/></Route>

        <SecureRoute path="/profile/edit"><ProfileEdit /></SecureRoute>
        <Route path="/profile/:userId"><Profile /></Route>
        <SecureRoute path="/profile"><Profile /></SecureRoute>

        <Route exact path="/countries"><Countries/></Route>
        <Route path="/countries/:countryId"><CountryShow/></Route>
        
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>

        <Route path="/trips/new"><TripCreate /></Route>
        <SecureRoute path="/trips/:tripId/edit"><TripEdit /></SecureRoute>
        <Route path="/trips/:tripId/"><TripShow /></Route>
        <Route path="/trips/"><TripsIndexAsMap /></Route>

        <Route path="/memories/:memoryId"><MemoryShow /></Route>

      </Switch>
    </BrowserRouter>
```

#### Home Page:
This was the first page to be created.
![home](/rmassets/home.png)

#### Nav Bar:
Created with Bootstrap 5 & React Bootstrap, it has been created without a background to allow a cleaner looking nav bar. The far left icon is the home button. Register and Login is stacked on the right. When a user has logged in, this section will update to show logout.

```js
<Navbar bg="" variant="light" expand="md">    
  <Link to="/" className="homeIcon navbar-nav"><img alt="logo" 
    className="logo-home nav-link me-auto" src ={logoImageLink}/></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">    
      <ul className="navbar-nav me-auto"> 
        <li className="nav-item active">
          <Link to="/aboutus" className="nav-link active">About Us</Link></li>
        <li className="nav-item active">
          <Link to="/countries" className="nav-link active">Inspire Me</Link></li> 
        <li className="nav-item active">
          <Link to= "/trips/new" className="nav-link active">Create a Trip</Link></li>
        <li className="nav-item active">
          <Link to= "/trips" className="nav-link active">See Trips</Link></li>  
      </ul>      
      <ul className="navbar-nav ms-auto">   
          {!isLoggedIn && 
            (
            <div className="nav-item auth">
              <li className="nav-item"><Link to="/register" className="nav-link active">REGISTER</Link></li>
              <li className="nav-item"><Link to="/login" className="nav-link active">LOGIN</Link></li>
            </div>
            )}
          {isLoggedIn && (
            <>
              <Link to="/" className="navbar-item nav-link active" onClick={handleLogout}>LOG OUT</Link>
              <Link to={'/profile'} className="nav-link active">Profile</Link>
            </>
          )}
      </ul>
      </Navbar.Collapse>
    </Navbar>   
  ```

#### About Us:
This page was created to give an introduction into what the app does. The image cards have been designed to look like polaroid images. The page is fully mobile responsive and features modal pop out images created with Bootstrap.
![about us](/rmassets/about.png)

#### Inspire Me:
This page acts as an index for all the available countries. Clicking onto any of the country images will take you to a show page for the selected country. The Index page has a search bar for the user to type the country of choice.

```js
  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredCountries = (countries) => {    
    return countries.filter(country => {
      return (
        country.name.toLowerCase().includes(searchValue.toLowerCase()) 
      )
    })
  }
```
![countries index](/rmassets/countriesindex.png)

### Show Country Page:
User trips that match this country are added to the country page for other users to view.
It is important to note that the country name must be selected when creating the trip or else it has no way to link to this page.
![country trips](/rmassets/countryloggedtrips.png)

### Create a Trip:
This page is accessible via the nav bar and via a logged in user profile. To create a trip is the beginning of creating a memory also. You must first create a trip to contain all the memories.
![create trip](/rmassets/createtrip.png)

### Create Memories:
After a trip section has been successfully completed and saved, it will send the post request using the same name as the trip. All memories created now belong to that trip. 

![create memories](/rmassets/creatememories.png)

The image upload is maintained by using Cloudinary (end-to-end image storage/manipulation).
![cloudinary memories](/rmassets/cloudinarymemories.png)

### Mapbox:
It was decided very early on that we wanted Maps to be part of this project. It is logical that for a user to upload a photo memory, then it should have a documented location and country. Our map makes it possible to show and plot users' memories by location. The first choice map was originally the Google Maps API. Unfortunately it proved too difficult to work with, so we tried Mapbox. Mapbox was an ideal solution, and functions well on our app. However, We did encounter issues with Mapbox when deploying the app (Map/page crash). We tested other versions of Mapbox and were able to overcome this.   

### See Trips:
This page shows a large map documenting all the locations of trips - of course, the more users on this app, the more populated the map would be.
Each user's memory is allocated a unique colour trip polyline to track places of travel.

```js
const attachLineColorToTrips = (trips) => {
  return trips.map(trip => {
    trip.lineColor = randomRGBA({ alpha: 0.8 })
    return trip
  })
}
```

![see all trips](/rmassets/seealltrips.png)


### Register and Login:
Both forms are controlled by using state and will throw errors if any of the field requirements are not met.
Once a user successfully registers, the page redirects to the login page. Once login is successful, the user is granted a token and redirected to the user profile page.

  ```js
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      getUserId()
      history.push('/profile')
    } catch (err) {
      setIsError(true)
    }
  }
  ```
![register](/rmassets/register.png)
![login](/rmassets/login.png)

### Profile:
The initial profile page created upon initial login is only partially complete.
A placebook default image is used for the profile image.
From this point, the logged in user has options to edit profile or navigate to creating a new trip/memory.
![initial profile](/rmassets/profileinitial.png)

### Edit Profile:
Navigating over to edit profile, the user is now able to fill in some basic information and upload a profile image (to cloudinary).
![edit profile](/rmassets/profileedit.png)


### Profile with memories:
Every trip and memories created will now show (index) on the owner's user profile. 
These memories can be clicked on to view in more detail. 
![user profile](/rmassets/profile.png)

### Single Memory view:
Following on from the user profile memories (index), the below illustrates a single memory show page.
![user single memory](/rmassets/singlememory.png)


## Challenges:
* Working on a shared GitHub file
* Merge conflicts 
* Using new technologies (Map), Maps is out of my comfort zone
* Bootstrap 5.0 took a little bit of getting used to

## Wins:
* A professional looking app which is mobile responsive
* Covering a lot of ground over the course of 1 week, I'm very happy that we have managed to build a full-stack app that conveys what we initially set out to do.

## Bugs:
* Deployed app 'Inspire Me' correctly shows the country index, but when clicking into an individual country, the page breaks.
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
* If ever I need to use Maps going forward, avoid Google maps

## Future Content and Improvements:
* It's easy to suggest things to add (i.e, liking photos/memories, perhaps comment features) - however, I think that any chance to revisit would be to prioritise ironing out bugs to allow all page functionality and then improve on usability of app
* General aesthetics ok, but maybe pages that have maps need simplifying or updating the layout to make the user experience more streamlined
* Improve user navigation experience, I feel that someone who has never used the site before may struggle with what order to do things. Such as, a user wanting to upload memories (photos), they would first need to create a trip, fill in details, pick a country, and save the trip. Then upload photo, fill in form, finetune location on map, and then save the memory
* Darkmode would be a nice touch to this site 

<br></br>
<hr></hr>

[Back to TOP](#overview "Goto overview")