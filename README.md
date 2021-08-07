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

## User Story

## Data Flow

## Challenges and Conclusion
