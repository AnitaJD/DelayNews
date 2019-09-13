const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

router.get('/', function(req, res) {
  res.render('index');
});

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

router.get('/first', corsMiddleware, async function(req, res) {
  try {
    let resp = await axios('http://slowpoke.desigens.com/json/1/7000', {
      timeout: 6000
    });
    let news = await resp.data;
    let newsArray = [];
    for (let i = 0; i < news.length; i++) {
      newsArray.push({ oneNews: news[i].title });
    }
    res.render('first', {
      newsArray: newsArray
    });

  } catch (e) {
    await fs.appendFile(
      'errorNews.txt',
      `\n${new Date()}${e.message}\n${e.code}\n${e.stack}\n`,
      function(error) {
        if (error) throw error;
      }
    );
    res.render('first', {
      error: 'не дождались новостей'
    });
    //console.log('не дождались новостей');
  }
});

router.get('/second', corsMiddleware, async function(req, res) {
  try {
    let resp = await axios('http://slowpoke.desigens.com/json/2/3000', {
      timeout: 3000
    });
    let phrase = await resp.data;
    let phraseArray = [];
    for (let i = 0; i < phrase.length; i++) {
      phraseArray.push({onePhrase: phrase[i]});
      //console.log(phrase[i]);
    }

    res.render('second', {
      phraseArray: phraseArray
    });
  } catch (e) {
    await fs.appendFile(
      'errorPhrase.txt',
      `\n${new Date()}${e.message}\n${e.code}\n${e.stack}\n`,
      function(error) {
        if (error) throw error;
      }
    );
    res.render('second', {
      error: 'не дождались фраз'
    });
    // console.log('не дождались фраз');
  }
});

module.exports = router;
