const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url = 'https://www.amazon.in/Apple-MacBook-Air-13-3-inch-MQD32HN/dp/B073Q5R6VR/';

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  }

async function checkPrice(page){
    await page.reload();
    let priceID = await page.evaluate(() => document.querySelector('#priceblock_ourprice').innerHTML);
    let currentPrice = Number(priceID.replace(/[^0-9.]+/g,""));
    
    if(currentPrice < 54000){
        console.log("You can buy it now, the current price is now "+currentPrice);
        sendNotif(currentPrice);
    }
} 


async function sendNotif(currentPrice){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
      });
      
      let mailOptions = {
        from: 'youremail@gmail.com',
        to: 'targetemail@gmail.com',
        subject: 'Price drop alert!',
        text: `You can buy Macbook Air now , Its price has been dropped to ${currentPrice}INR. Check ${url}`
      };
      
     let info = await transporter.sendMail(mailOptions);
     console.log(`Message sent to ${info.messageId}`);
}


async function init(){
    const page = await configureBrowser();
let scheduleJob = new CronJob('* */1 * * * *',function(){   //Read CronJob pattern for more info
    checkPrice(page);
});
scheduleJob.start();
}

init();

