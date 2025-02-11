[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vxWRKI0Z)
Assignment 3 - Persistence: Two-tier Web Application with Database, Express serverNoMongo, and CSS template
===

Due: February 10th, by 11:59 AM.

This assignment continues where we left off, extending it to use the most popular Node.js serverNoMongo framework (Express), 
a database ([MongoDB](https://www.mongodb.com/)), and a CSS style framework / template of your choice ([Material Tailwind](https://www.material-tailwind.com/),
[MaterialUI](https://mui.com/), [Tailwind CSS](https://tailwindcss.com/), [Mantine](https://mantine.dev), [Shadcn](https://ui.shadcn.com/), etc.).

Baseline Requirements
---

Your application is required to implement the following functionalities:

- a `Server`, created using Express (no alternatives will be accepted for this assignment)
- a `Results` functionality which shows all data, except passwords, associated with a logged-in user
- a `Form/Entry` functionality which allows users to add, modify, and delete data items (must be all three!) associated with their username / account. 
  The authentication is to be implemented using [Passport - Local Strategy](https://www.passportjs.org/packages/passport-local/) 
  which authenticates using a simple username and password. For the purposes of this assignment, you do not have to encrypt
  the password.
- Persistent data storage in between serverNoMongo sessions using [MongoDB](https://www.MongoDB.com/cloud/atlas) (you *must* use MongoDB for this assignment). You can use either the [official MongoDB node.js library](https://www.npmjs.com/package/MongoDB) or use the [Mongoose library](https://www.npmjs.com/package/mongoose), which enables you to define formal schemas for your database. Please be aware that the course staff cannot provide in-depth support for use of Mongoose.  
- Use of a CSS style framework (see possibilities at the beginning of this assignment). 
  This should do the bulk of your styling/CSS for you and be appropriate to your application. 
  For example, don't use [NES.css](https://nostalgic-css.github.io/NES.css/) (which is awesome!) unless you're creating a game or some type of retro 80s site.

Your application is required to demonstrate the use of the following concepts:  

HTML:  
- HTML input tags and form fields of various flavors (`<textarea>`, `<input>`, checkboxes, radio buttons etc.)
- HTML that can display all data *for a particular authenticated user*. Note that this is different from the last assignment, which required the display of all data in memory on the serverNoMongo.

Note that it might make sense to have two pages for this assignment, one that handles login / authentication, and one that contains the rest of your application.
For example, when visiting the home page for the assignment, users could be presented with a login form. After submitting the login form, if the login is 
successful, they are taken to the main application. If they fail, they are sent back to the login to try again. For this assignment, it is acceptable to simply create 
new user accounts upon login if none exist, however, you must alert your users to this fact.  

CSS:  
- CSS styling should primarily be provided by your chosen template/framework. 
Oftentimes a great deal of care has been put into designing CSS templates; 
don't override their stylesheets unless you are extremely confident in your graphic design capabilities. 
The idea is to use CSS templates that give you a professional looking design aesthetic without requiring you to be a graphic designer yourself.

JavaScript:  
- At minimum, a small amount of front-end JavaScript to get / fetch data from the serverNoMongo. 
See the [previous assignment](https://github.com/cs4241-c25/a2-shortstack) for reference.

Node.js:  
- A serverNoMongo using Express and a persistent database (MongoDB).

General:  
- Your site should achieve at least 90% on the `Performance`, `Best Practices`, `Accessibility`, and `SEO` tests 
using Google [Lighthouse](https://developers.google.com/web/tools/lighthouse) (don't worry about the PWA test, and don't worry about scores for mobile devices).
Test early and often so that fixing problems doesn't lead to suffering at the end of the assignment. 

Deliverables
---

Do the following to complete this assignment:

1. Accept the A3 assignment which should automatically create a private repository for you.
2. Implement your project with the above requirements. Consider beginning by converting your A2 
   assignment. First, change the serverNoMongo to use express. Then, modify the serverNoMongo to use MongoDB 
   instead of storing data locally. Last but not least, implement user accounts and login using
   Passport Local Strategy. User accounts and login is a difficult part of this assignment, so
   budget your time accordingly. 
3. Ensure that your project has the proper naming scheme as previous assignments except starting
   with "a3-" so we can find it. 
4. Modify the README to the specifications below.
5. Push your final application to your assignment GitHub repository before the deadline at 11:59pm. 
6. Create an empty, temporary, `public` GitHub repository. Push your final application to this
   repository. 
7. Import from this public repository to deploy on Glitch (unless completing the 
   alternative serverNoMongo technical achievement described below). Fill in the appropriate fields in 
   your package.json file. Delete the public repository after the import has been successful. 
8. Test your project to make sure that when someone goes to your main page on Glitch (or an 
   alternative serverNoMongo), it displays correctly.

Achievements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the 
assignment to your personal interests, for a maximum twenty additional points and a maximum grade of a 100%. 
These are recommended achievements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README, 
why it was challenging, and how many points you think the achievement should be worth. 
ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*
- (5 points) Instead of Glitch, host your site on a different service like [Vercel](https://vercel.com/) or [Heroku](https://www.heroku.com).
  Make sure to describe this a bit in your README. What was better about using the service you chose as compared to Glitch? 
  What (if anything) was worse? 
- (up to 5 points) List up to five Express middleware packages you used and a short (one sentence) summary of what each 
  one does. THESE MUST BE SEPARATE PACKAGES THAT YOU INSTALL VIA NPM, NOT THE ONES INCLUDED WITH EXPRESS. So express.json
  and express.static don't count here. For a starting point on middleware, see [this list](https://expressjs.com/en/resources/middleware.html).

*Design/UX*
- (10 points) Make your site accessible using the [resources and hints available from the W3C](https://www.w3.org/WAI/), 
  Implement/follow twelve tips from their [tips for writing](https://www.w3.org/WAI/tips/writing/),
  [tips for designing](https://www.w3.org/WAI/tips/designing/), and [tips for development](https://www.w3.org/WAI/tips/developing/).
  *Note that all twelve must require active work on your part*. 
  For example, even though your page will most likely not have a captcha, you don't get this as one of your twelve tips 
  to follow because you're effectively getting it "for free" without having to actively change anything about your site. 
  Contact the course staff if you have any questions about what qualifies and doesn't qualify in this regard. 
  List each tip that you followed and describe what you did to follow it in your site.
- (10 points) Describe how your site uses the CRAP principles in the [Non-Designer's Design Book](https://learning.oreilly.com/library/view/the-non-designers-design/9780321563088/)
  Make sure you are logged in to Canvas before clicking on the book's link.
Which element received the most emphasis (contrast) on each page? 
How did you use proximity to organize the visual information on your page? 
What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? 
How did you use alignment to organize information and/or increase contrast for particular elements. 
Write a paragraph of at least 125 words *for each of four principles* (four paragraphs, 500 words in total). 

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title

your glitch (or alternative serverNoMongo) link e.g. http://a3-wilson-wong.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored

## Technical Achievements
- **Tech Achievement 1**: Express middleware packages
body-parser: Parses incoming request bodies in a middleware before your handlers
express-session: Create a session middleware with the given options
passport-local: Passport strategy for authenticating with a username and password

## Design/Evaluation Achievements
- **Design Achievement 1**: CRAP Writing
Contrast:
Contrast is a way of making elements on a page stand out. It is a way of getting the user to look at the main functions 
or main purposes of the page before anything else. Firstly we begin with the sign up page. The most contrasting element 
on the sign up page was the sign up button. The color blue was used to stand out against the white background, and is a 
pop of color on an otherwise basic page. For the login page this was again the buttons, but this time the main button in
blue was the logon, and then also had the grey signup button for if the user does not have a sign in yet. Finally on the
main page, blue was used for the contrasting color. This time it has a button as well as a text field that will redirect
to the sign in page, either because the user is not signed in or if the user is signed into another user's account.

Repetition:
Repetition is used throughout this site in order to create a cohesive and consistent design. The color scheme, fonts, 
and especially the button styling were consistent on all pages. For example, the buttons on almost all pages are the 
same blue color, at least if it is the main button on the page. The one exception to this rule was on the login page, 
where there was one grey button for making an account, but this was done deliberately as this is a button that should 
only be used once per user. This repetition helps enforce the feel of the pages. It helps in building a recognizable 
webpage at just a glance, and helps the pages feel a lot more cohesive, as they are a part of a whole.

Alignment:
Alignment was used in order to organize the information and to create a clean and structured layout. All of the text and 
for elements are left-aligned with each other. This created the feel that I wanted out of the pages, almost as if this 
is a paper or really anything else that is typically done through education, relating back to the purpose of the 
application, tracking assignments. It also makes the use of space on the page much better than the previous 
implementation of center aligning everything. Center aligning was originally done for a visual reason, and the 
functionality of the page is much better with left alignment. Usability was a big factor in the decision of making 
everything left aligned, and it most definitely achieves this goal.

Proximity:
Proximity is used to organize the information on the page, and try to keep related elements in close proximity to each 
other, making it easier for the users of the web application to see the relationships between different pieces of 
information. As an example, the form fields have labels placed right above what the field is requiring. Without such a 
label, or labeling improperly, this would be a confusing page, and users would not know what field they are populating 
outside of the options they have to populate them (radio buttons, date, etc). In a similar vein, the buttons on the 
login page are very close to the username and password fields, and the sign up button is put on a new line in a 
different color to indicate that it has nothing to do with the fields above the login button.