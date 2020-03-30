# Duck feed App
* **Demo url:** <a herf="https://floating-lake-43579.herokuapp.com/">https://floating-lake-43579.herokuapp.com/</a>

## Requirement
A scientist is trying to understand how ducks are being fed in parks around the world. She wants to collect the following information:
- What time the ducks are fed
- What food the ducks are fed
- Where the ducks are fed
- How many ducks are fed
- What kind of food the ducks are fed
- How much food the ducks are fed
- Nice to have: the ability for a little old lady who feeds the ducks every day in the same
way to set a repeating schedule so she doesn’t have to use the application every day


## Approach to the problem
- ##### User registration and login as two roles: User and Scientist.
    - **user:** view and CURD operation and schedule feed,
    - **scientist:** View only
    - **Completeness: 60%** Implement user registration with one role for now.


- ##### Dashborad operations
    - CURD operations for Food, Food Type, Schedule, Feed and Location.
    - Search
    - **Completeness: 70%** Should add constrains for CURD operations based on Entitis's relationship.


- ##### Schedule event auto emiter
    * Schedule a feed with a specific datebased scheduler and recurrence rules
    * **Completeness: 50%** Should add constrains for CURD operations based on Entitis's relationship.


## Technologies chosen
- #### React and Redux for Frontend
    - **React:** Light weight and perfect for on plage applications
    - **Redux:** Also light weight. Choose redux in order to learn it and think React is already good enough for this app and redux would cause some extra code.
    -**Note:** Redux is only implemented to user registration.

- #### ExpressJS and MongoDb for Backend
    - **NodeJs(ExpressJs):** Ease to create, deploy and test.
    - **MongoDb:** Works greatly with NodeJs(Choose mongodb as a chance to learn).

- #### Tools and key libs used:
    - **node-schedule:** A job scheduler which allows to schedule jobs with specific rules.
    - **JWT:** For authantication. It is maintain and debug and can create RESTful Services
    - **Axios:** Its easy to use for react API calls.
    - **Boostrap:** As world's largest UI ecosystem, no reason not to use it.
    - **scss:** Mature and has more features than css. note: used Prepros(a file compiler and hot reload tool)

- #### Deploy
    - **Heroku:** App is deplyed on Heroku
    - **mongoDB Atlsd:** Easy to Deploy, Operate, and Scale MongoDB in the Cloud.


## MongoDb models
- In 'submitionDoc/model_diagram.png' file.

![Alt text](submitionDoc/model_diagram.png?raw=true "model_diagram")


## High Level Component Diagram
- In 'submitionDoc/high_level_components.jpg'

![Alt text](submitionDoc/high_level_components.jpg?raw=true "duckfeed_wires1")


## Wireframe
- In 'submitionDoc/duckfeed_wires1.jpg' and 'submitionDoc/duckfeed_wires2.jpg' files.

![Alt text](submitionDoc/duckfeed_wires1.jpg?raw=true "duckfeed_wires1")
![Alt text](submitionDoc/duckfeed_wires2.jpg?raw=true "duckfeed_wires2")

## Time spent
Around 16 hrs
