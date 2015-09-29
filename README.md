# slack-mini-games
A collection of mini games for your slack team.
## List of games
  - Roller: roll between the numbers person with highest number wins.
  - Rock Paper Scissors

## Setting up
1. Setup the `Slash Command Token(s)` and `Webhook URL`. (Look at point 3 and 4 further below.)  

  You can either set these in config.js file under config directory or you can use ENV variables which is a better way of doing it. Using ENV variables on heroku:  

    `heroku config:set WEBHOOK_URL=[YOUR_WEBHOOK_URL]`  
    
    **Note:** Depending on the games you will need to add separate ENV variables for each slash command token.  
    `heroku config:set ROLLER_TOKEN=[YOUR_ROLLER_TOKEN]`

2. Deploy the node.js application (I'm using heroku here.)  

  There is a nice tutorial on deploying to heroku [here](https://devcenter.heroku.com/articles/deploying-nodejs).

3. Add a new [Incoming Webhook](https://slack.com/services/new/incoming-webhook) integration to your slack team:  

  Choose a `channel` to post messages to. (This doesn't matter, it will always post back to the channel that the slack command is called from.)  
  
  Grab your `Webhook URL` from this page.
  
4. Add a new [Slash Command](https://slack.com/services/new/slash-commands) integration to your slack team:  

  **Note:** Depending on the games you might need to add multiple slash commands.  
  
  ### Roller
  - **Command:** `roll`  
  - **URL:**  `http://DEPLOYED_APP_URL/roll`
  - **Method:** `POST`  
  - **Description:** `roll a number`  
  
  ### Rock Paper Scissors
  - **Command:** `rps`  
  - **URL:**  `http://DEPLOYED_APP_URL/rps`
  - **Method:** `POST`  
  - **Description:** `Rock Paper Scissors!`  

  Grab your slash command `token` from this page.
