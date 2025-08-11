// Firebase Configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Global variables
let currentUser = null;
let currentRoom = null;
let messagesRef = null;
let usersRef = null;
let userCountRef = null;

// AES Encryption/Decryption functions
function encryptMessage(message, key = 'defaultSecretKey123') {
    // Simple XOR encryption for demo (replace with proper AES in production)
    let encrypted = '';
    for (let i = 0; i < message.length; i++) {
        encrypted += String.fromCharCode(message.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
}

function decryptMessage(encryptedMessage, key = 'defaultSecretKey123') {
    try {
        const encrypted = atob(encryptedMessage);
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
            decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return decrypted;
    } catch (error) {
        return 'Error decrypting message';
    }
}

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const chatInterface = document.getElementById('chatInterface');
const usernameInput = document.getElementById('usernameInput');
const roomCodeInput = document.getElementById('roomCodeInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const leaveRoomBtn = document.getElementById('leaveRoomBtn');
const currentRoomCode = document.getElementById('currentRoomCode');
const currentUsername = document.getElementById('currentUsername');
const userCount = document.getElementById('userCount');
const activeUsers = document.getElementById('activeUsers');

// Utility functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showLoading(show = true) {
    loadingMessage.style.display = show ? 'block' : 'none';
}

function validateRoomCode(code) {
    return /^[0-9]{6}$/.test(code);
}
