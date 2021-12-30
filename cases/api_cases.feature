@complete @api

Feature: Cat Fact API

    As a user, I should be able to use the Cat Fact Api
    In order to get the cat fact or breeds list and
    Use them as services provider to thirds.

    Scenario: Get a cat fact
        Given the user request the car fact from 'https://catfact.ninja/fact?max_length=100'
        When the request is made
        Then the 'status' property should be equal '200'
        And the 'content-type' header property should be equal 'application/json'
        And the 'body' property should be a 'object'
        And the 'fact' property should be a 'string'
        And the 'fact' property should be within 0 100

    Scenario: Checking parameters on cat fact
        Given the user request the car fact from 'https://catfact.ninja/fact?limit=10&page=1'
        When the request is made
        Then the 'status' property should be equal '200'
        And the 'content-type' header property should be equal 'application/json'
        And the 'body' property should be a 'object'
        And the 'current_page' property should be a 'number' and be equal 1
        And the 'data' property should be a 'array' and be equal 10
        And the 'from' property should be a 'number' and be equal to pages number
        And the 'to' property should be a 'number' and be equal to pages 10
        And the 'per_page' property should be a 'number' and be equal to pages 10

    Scenario: Get a list of cat facts
        Given the user request the car fact from 'https://catfact.ninja/fact?max_length=50&limit=10'
        When the request is made
        Then the 'status' property should be equal '200'
        And the 'content-type' header property should be equal 'application/json'
        And the 'body' property should be a 'object'
        And the 'current_page' property should be a 'number' and be equal 1
        And the 'data' property should be a 'array' and be equal 10
        And the 'from' property should be a 'number' and be equal to pages number
        And the 'to' property should be a 'number' and be equal to pages 10
        And the 'first_page_url' property should be a 'string' and be equal 'https://catfact.ninja/fact?page=1'
        And the 'last_page' property should be a 'number' and be equal 4
        And the 'last_page_url' property should be a 'string' and be equal 'https://catfact.ninja/fact?page=4'
        And the 'next_page_url' property should be a 'string' and be equal 'https://catfact.ninja/fact?page=2'
        And the 'path' property should be a 'string' and be equal 'https://catfact.ninja/fact'
        And the 'prev_page_url' property should be null
        And the 'total' property should be a 'number' and be equal 33
        And the 'links' property should be a 'array' and be equal 6
        And the 'per_page' property should be a 'number' and be equal to pages 10

    Scenario: Get a empty list of cat facts
        Given the user request the car fact from 'https://catfact.ninja/fact?max_length=100&limit=10'
        When the request is made
        Then the 'status' property should be equal '200'
        And the 'content-type' header property should be equal 'application/json'
        And the 'body' property should be a 'object'
        And the 'current_page' property should be a 'number' and be equal 1
        And the 'data' property should be a 'array' and be equal 0
        And the 'from' property should be null
        And the 'to' property should be null
        And the 'first_page_url' property should be a 'string' and be equal 'https://catfact.ninja/fact?page=1'
        And the 'last_page' property should be a 'number' and be equal 4
        And the 'last_page_url' property should be a 'string' and be equal 'https://catfact.ninja/fact?page=1'
        And the 'path' property should be a 'string' and be equal 'https://catfact.ninja/fact'
        And the 'prev_page_url' property should be null
        And the 'total' property should be a 'number' and be equal 0
        And the 'links' property should be a 'array' and be equal 3
        And the 'per_page' property should be a 'number' and be equal to pages 10

    Scenario: Get a list of breeds
        Given the user request the car fact from 'https://catfact.ninja/breeds?limit=50'
        When the request is made
        Then the 'status' property should be equal '200'
        And the 'content-type' header property should be equal 'application/json'
        And the 'body' property should be a 'object'
        And the 'current_page' property should be a 'number' and be equal 1
        And the 'first_page_url' property should be a 'string' and be equal 'https://catfact.ninja/breeds?page=1'
        And the 'from' property should be a 'number' and be equal 1
        And the 'last_page' property should be a 'number' and be equal 4
        And the 'last_page_url' property should be a 'string' and be equal 'https://catfact.ninja/breeds?page=4'
        And the 'next_page_url' property should be a 'string' and be equal 'https://catfact.ninja/breeds?page=2'
        And the 'prev_page_url' property should be null
        And the 'total' property should be a 'number' and be equal 98
        And the 'path' property should be a 'string' and be equal 'https://catfact.ninja/breeds'
        And the 'data' property should be a 'array' and be equal 50
        And the 'per_page' property should be a 'number' and be equal to pages 50
        And the 'to' property should be a 'number' and be equal to pages 50
        And the 'links' property should be a 'array' and be equal 3

    Scenario: Checking parameters on breeds
        Given the user request the car fact from 'https://catfact.ninja/fact?max_length=100'
        When the request is made
        Then the 'status' property should be equal '200'
        And the 'content-type' header property should be equal 'application/json'
        And the 'body' property should be a 'object'
        And the 'current_page' property should be a 'number' and be equal 1
        And the 'data' property should be a 'array' and be equal 10
        And the 'from' property should be a 'number' and be equal to pages number
        And the 'to' property should be a 'number' and be equal to pages 10
        And the 'per_page' property should be a 'number' and be equal to pages 10