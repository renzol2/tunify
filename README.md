# Tunify

[UIUC](https://cs.illinois.edu/) [**CS 411 Database Systems**](https://cs.illinois.edu/academics/courses/CS411) Final Course Project

## Table of Contents

- [Tunify](#tunify)
  - [Table of Contents](#table-of-contents)
  - [Team](#team)
  - [Overview and Usefulness](#overview-and-usefulness)
  - [Data Population and Database Schema](#data-population-and-database-schema)
  - [Advanced Queries and Indexes](#advanced-queries-and-indexes)
  - [Stored Procedure and Trigger](#stored-procedure-and-trigger)
  - [User Story](#user-story)
  - [Data Flow](#data-flow)
  - [Challenges and Conclusion](#challenges-and-conclusion)

## Team

- [Renzo Ledesma](https://github.com/renzol2)
- [Urvi Awasthi](https://www.linkedin.com/in/urviawasthi/)
- [Owen Michuda](https://github.com/OwenMichuda)
- [Aliva Panigrahi](https://github.com/alivabernali)

## Overview and Usefulness

Tunify is a web service through which users can meet those with similar taste in music. Users create an account and proceed to like various artists, genres, and songs. They can then view other users with mutual interests, like their profiles, and initiate friendships. In developing Tunify, we gained an understanding of full stack web development by developing a database schema consisting of various tables which we were able to interact with via advanced queries and triggers, a backend REST API using ExpressJS to handle HTTP requests communicating with the database, and a frontend web application designed and programmed with React. During the process, we learned a variety of tools and technologies while addressing various challenges in making our application the best it can be.

In the grand scheme of things, Tunify was developed to address the lack of social interaction amidst the current global pandemic. While social media apps were useful in keeping touch and sharing information with our peers, it was difficult to meet new people; this can be especially hard on university students trying to make friends. We realized that people universally bond over music, and that we could base an application around that which addresses the current problem and brings about a positive outcome.

## Data Population and Database Schema

To populate the database that would be necessary to build Tunify, we found a Spotify dataset from Kaggle with data on various categories involving Spotify’s data. We were able to settle on the following categories to integrate into Tunify: Artists, Genres, and Songs. To parse this data set, we used the Pandas library from Python on Jupyter Notebooks, and obtained the necessary data to populate our tables. Our data is mainly broken down into two collections: music related data from the Spotify set and the user collections. The user collections include users, the matches they make, and the musical content that they like. Upon deciding all of our categories we were able to develop an overall design for Tunify’s backend and user story, outlined via our ER diagram:

TODO: insert diagram

As demonstrated, Tunify’s database tables are tightly connected. Users create uniquely identified accounts through which they can like artists, users, and genres. Artists can belong to specific genres, and they create their own songs. With this in mind, we were able to develop a plan for our database and decide on schemas.

The first few tables designate our actual fields: the artists, users, songs, and genres. The subsequent tables are meant to represent the relationships between these fields. Thus, we have the following:

- A `UserUser` table, which is dedicated to the matches between users
- A `UserSong` table, which is dedicated to songs liked by users
- A `UserArtist` table, which represents users and the artists they like
- A `UserGenre` table, for users and the respective genres they like

This relational schema is the final database that Tunify uses. We initially had additional relational tables such as: `ArtistGenre`, `SongGenre`, and `AristSong`. While these did not make it into our current iteration of Tunify, we hope to integrate these tables in the future.

## Advanced Queries and Indexes

In order to provide another level of interactivity, we designed advanced queries that were more personal and informational, as the first step of the development process, following the creation of our tables. Our advanced queries did the following:

- Returned songs released on the user’s birthday
- Returned songs from the 21st century (more relevant to our user base)
- Returned artists in the top 50% in terms of popularity (so users can see more popular artists)

Each team member devised and developed these queries. For implementing indices on our advanced queries, we tested multiple attributes as the index for each query. We then decided which attribute to use as an index based on performance time. For many of our advanced queries, implementing an index did not make a significant difference as the queries did not require table joins.

This means that the execution time of these queries was already small to begin with, not leaving much room for improvement. However, we observed that for our queries requiring table joins, indexing on the attribute in the select statement decreased the duration of the query by close to 20%.

For our development process, we each split up the Stage 4 operations as required by the project specifications. Each member was responsible for a table in the backend, its corresponding frontend (CRUD operations/user interface), as well as an advanced query that they developed. We agreed on a uniform design for all tables.

Upon finishing the stage, we had a functional web interface with the following pages: Artists, Users, Songs, Genres. On each page, we had functioning CRUD operations where an individual on the page could create a new row, and search the tables for results by name. They could also run advanced queries to get results matching their input.

## Stored Procedure and Trigger

The advanced database program that we found most appropriate for Tunify was the stored procedure + trigger combination. These two ended up being very useful to our application, as our application’s functionality is dependent on user contribution, and having various tables updated on user interaction is ideal for Tunify. Specifically, our stored procedure handled three different tasks simultaneously: it queried the similar artists, users, and genres between two users, put these three categories into separate tables, and returned the three newly created tables.

Our trigger served a completely different purpose. When a user liked another user, we decided to have our trigger set the value of the “initiative” column in the UserUser table to 1- this meant that one user took initiative to like another user, and the results of this would be displayed on the page of the user who was “liked”, as a message that said, “`User` liked you first! Like them back!”

Developing the trigger was where we faced some major challenges, but we were able to overcome them by implementing the solution above. Initially, we hoped to create a trigger which increments a match count column, when two users like each other. While working on the trigger, we realized we can only update new rows and columns. As a result, we redesigned the solution to incorporate the newly created initiative column instead. This allowed us to satisfy not only the project requests, but add a level of interactivity to our application. We would like to note that it would be nice to add the match count feature in a future iteration of Tunify.

## User Story

Ultimately, all of these attributes developed alongside our frontend fit together to create our final, current version of Tunify, a web service with a cohesive user story:

- User creates an account with their email, or signs in with an existing email.
- User likes their preferred artists, genres, and songs on the Search page.
- User is presented with other users with mutual interests on the Matchmaking page.
- User can show initiative by liking another user’s profile; the other User is notified of this and can like them back, which can prompt conversation.

The next section will elaborate on the data flow with each part of the user story, and how our database accommodates this data flow appropriately.

## Data Flow

TODO: home screen

Tunify has two states; the user is either logged in or not logged in. In the first step of the user story, the user can log in by either creating a new account using an email, or signing in using an existing account’s email. When a user creates an account, a new User is created in the database, and the user is logged in. When a user logs in with an existing account, the backend checks if the user’s email already exists within the database. If the email does exist, the user can log in successfully; otherwise, the user must sign up with that email or choose an existing email. These operations are fairly simple, with the authentication state and some of the error handling being handled in the frontend.

TODO: sign up

TODO: sign in

In the second step of the user story, the user can search for artists, genres, and songs, and add them to their likes. The Search page allows the user to query by name, which returns the names of any artists, genres, and songs that match the query. When the user likes an artist, genre, or song, a relationship is created in our relational tables between users and artists/genres/songs. The user can also dislike songs, which simply removes that relationship from the relational tables.

TODO: search

The third and most important step of our user story involves the Matchmaking page, where users can view other users who have liked the same artists, genres, and songs. This page fetches those users immediately, displaying all the users in an easy-to-view format.

TODO: matchmkaing

The user can then directly compare all the artists, genres, and songs that they have liked with another user, which is powered by a stored procedure.

TODO: comparison

If the user pleases, they can like the users on the Matchmaking page, creating relationships between both users. Our database trigger keeps track of which user likes the other first; so, for example, User A likes User B first, and then User B likes User A after, User B will be able to see that User A took “initiative” and liked them first. This feature is aimed to encourage users to interact more, emphasizing the initiative that some users take when wanting to create connections.

TODO: tooltip

## Challenges and Conclusion

While we faced our fair share of challenges, these allowed us to learn and devise creative solutions to solve them. For example, we originally wanted our trigger to keep track of the mutual number of liked artists, genres, and songs that a pair of users had in common. However, this original trigger design was unfeasible because it required multiple events to be triggered by, and was overall fairly complicated, which we found difficult to implement. However, this led to our choice to make the triggers keep track of “initiative”, where a user liking another user first marks that relationship as having initiative, which led to the additional feature in the frontend that we wouldn’t have thought of otherwise. As a result, while the application didn’t follow along perfectly with our original plan, it still worked out successfully and made us think outside the box.

The division of labor between our group members came naturally, as we all had different strengths. Owen focused primarily on the database schema and helped all our members the most with providing advanced queries and performing index analysis. Aliva and Urvi focused on designin the stored procedure and trigger, which became key components of the final application. Renzo focused on frontend design and web application problems, creating most of the user interface and linking it up with the database and backend provided by the other three members.

While Tunify isn’t necessarily a traditional solution to solving a lack of social interaction, it addresses it in a unique and relevant way. Developing it was a wonderful learning process, and we hope that in the future we can incorporate additional features that we weren’t able to get to during the semester.
