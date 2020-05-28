## About

This is a script which scrapes through your favourite product on Amazon India and tracks its prizes and when it comes down a certain limit, it mails you.

**Note:-** In case of nodemailer popping up an logging error. Do read [Stackoverflow](https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted)

### Technologies Used

It uses : 
* NodeJS
* Puppeteer (For scraping)
* CronJob (To schedule a job)
* Nodemailer (To send Emails)

## Usage

`npm install`

Installs the required dependencies.

`node index`

Starts the script.
