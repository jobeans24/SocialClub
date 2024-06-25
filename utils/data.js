const users = [
'Captain America',
'Falcon',
'The Winter Soldier',
'Black Widow',
'Thor',
'Hulk',
'Iron Man',
'Black Panther'
];

const thoughts = [
    'I am Captain America',
    'I am Falcon',
    'I am The Winter Soldier',
    'I am Black Widow',
    'I am Thor',
    'I am Hulk, I am strongest there is',
    'I am Iron Man, The Avengers work for me',
    'I am Black Panther'
];

const getRandUser = () => {
    const randIndex = Math.floor(Math.random() * users.length);
    return users[randIndex];
}

const getRandThought = () => {
    const randIndex = Math.floor(Math.random() * thoughts.length);
    return thoughts[randIndex];
}

module.exports = { getRandUser, getRandThought };