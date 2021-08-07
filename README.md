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

## Advanced Queries and Indexes

## Stored Procedure and Trigger

## User Story

## Data Flow

## Challenges and Conclusion
