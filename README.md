# Epic-Mail

[![Build Status](https://travis-ci.com/olaludesunkanmi/Epic-Mail.svg?branch=develop)](https://travis-ci.com/olaludesunkanmi/Epic-Mail)
[![Coverage Status](https://coveralls.io/repos/github/olaludesunkanmi/Epic-Mail/badge.svg)](https://coveralls.io/github/olaludesunkanmi/Epic-Mail)
[![Maintainability](https://api.codeclimate.com/v1/badges/649001a02dc634da375f/maintainability)](https://codeclimate.com/github/olaludesunkanmi/Epic-Mail/maintainability)

## Description
A web app that helps people exchange messages/information over the internet.

## Gh-pages Link
https://olaludesunkanmi.github.io/Epic-Mail/UI

### Required Features
1. Users can sign up.
2. Users can login.
3. Users can create groups.
4. Users can send a message to individuals.
5. Users can view their inbox and read messages.
6. Users can retract sent messages.
7. Users can save an email as draft and send it later or delete it.


### Pivotal Tracker Link
https://www.pivotaltracker.com/n/projects/2315231

### API Routes

S/N | Verb   | Endpoint         | Description             |
---:| -------|------------------|-------------------------|
  1 | Post   | /auth/signup     | Create a user account   |
  2 | Post   | /auth/login      | Sign in a user          |
  3 | Get    | /messages        | Get all received emails |
  4 | Get    | /messages/unread | Get all unread emails   |
  5 | Get    | /messages/sent   | Get all emails sent     |
  6 | Get    | /messages/id     | Get a specific email    |
  7 | Post   | /messages        | Send email to users     |
  8 | Delete | /messages/id     | Delete an email         |

### API Documentation
https://epicmail6.docs.apiary.io/