let canJoin = true;

async function connect(code, name) {
  const status = document.getElementById('status');
  status.textContent = "Connecting to game...";

  try {
    const response = await fetch("https://api.blooket.com/api/firebase/join", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: code,
        name: name
      })
    });

    if (response.ok) {
      status.style.color = "lime";
      status.textContent = `Bot "${name}" joined successfully!`;
    } else {
      status.style.color = "orange";
      status.textContent = "Failed (invalid code or game full)";
    }
  } catch (err) {
    status.style.color = "red";
    status.textContent = "Connection error";
    console.error(err);
  }

  canJoin = true;
}

function join() {
  if (!canJoin) {
    alert("Please wait a moment...");
    return;
  }

  canJoin = false;

  const code = document.getElementById('gcode').value.trim();
  let name = document.getElementById('gname').value.trim() || "Bot";

  if (!code) {
    alert("Enter a game code!");
    canJoin = true;
    return;
  }

  if (document.getElementById('fpswitch').checked) {
    name = "  " + name;
  }

  connect(code, name);
}

window.join = join;