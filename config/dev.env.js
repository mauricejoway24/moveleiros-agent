'use strict'
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// prodEnv.BASE_HUB_URL = '"http://192.168.1.36:59471/"'
prodEnv.BASE_HUB_URL = '"http://localhost:59471/"'
prodEnv.firebaseConfig = {
  apiKey: '"AIzaSyDUJRNuU70m_qyT-9moAsgZW8sMnQjUO-s"',
  authDomain: '"chat-moveleiros.firebaseapp.com"',
  databaseURL: '"https://chat-moveleiros.firebaseio.com"',
  projectId: '"chat-moveleiros"',
  storageBucket: '""',
  messagingSenderId: '"167205043639"'
}

prodEnv.NODE_ENV = '"development"'

module.exports = prodEnv
