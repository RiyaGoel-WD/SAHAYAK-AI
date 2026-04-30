

function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(function(screen) {
    screen.classList.remove('active');
  });
  // Show only the requested screen
  document.getElementById(screenId).classList.add('active');
}



var selectedEmergency = '';
var userLocation = {
  lat: null,
  lng: null,
  text: 'Fetching...'
};




function selectEmergency(type) {
  selectedEmergency = type;

  
  var labels = {
    medical: '🏥 Medical / Accident',
    crime:   '🚔 Crime / Assault',
    cyber:   '💻 Cyber Crime / Fraud'
  };

  document.getElementById('display-emergency-type').innerText = labels[type];

  
  document.getElementById('display-location').innerText = 'Fetching your location...';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // Success — we got the coordinates
        userLocation.lat  = position.coords.latitude.toFixed(5);
        userLocation.lng  = position.coords.longitude.toFixed(5);
        userLocation.text = userLocation.lat + ', ' + userLocation.lng;
        document.getElementById('display-location').innerText = userLocation.text;
      },
      function(error) {
        // Failed — use a fallback message
        userLocation.text = 'Location unavailable (demo mode)';
        document.getElementById('display-location').innerText = userLocation.text;
      }
    );
  } else {
    userLocation.text = 'Location not supported on this device';
    document.getElementById('display-location').innerText = userLocation.text;
  }

 
  var list = document.getElementById('contacts-list');
  if (list.children.length === 0) {
    addContactField();
  }

  // Move to step 2
  document.getElementById('sos-step-1').style.display = 'none';
  document.getElementById('sos-step-2').style.display = 'block';
}




function goBackToStep1() {
  document.getElementById('sos-step-2').style.display = 'none';
  document.getElementById('sos-step-1').style.display = 'block';
}

function addContactField() {
  var list = document.getElementById('contacts-list');

  var row = document.createElement('div');
  row.className = 'contact-row';

  row.innerHTML =
    '<input class="contact-input" type="text" placeholder="Name or phone number" />' +
    '<button class="remove-contact-btn" onclick="this.parentElement.remove()">✕</button>';

  list.appendChild(row);
}

function sendAlert() {
  // Collect all filled-in contacts
  var inputs = document.querySelectorAll('#contacts-list .contact-input');
  var contacts = [];

  inputs.forEach(function(input) {
    if (input.value.trim() !== '') {
      contacts.push(input.value.trim());
    }
  });

  // Stop if no contacts were added
  if (contacts.length === 0) {
    alert('Please add at least one emergency contact!');
    return;
  }

 
  var emergencyLabels = {
    medical: 'Medical Emergency / Accident',
    crime:   'Crime / Assault',
    cyber:   'Cyber Crime / Fraud'
  };

  var message =
    '🆘 EMERGENCY ALERT 🆘\n' +
    '─────────────────────\n' +
    'Situation : ' + emergencyLabels[selectedEmergency] + '\n' +
    'Location  : ' + userLocation.text + '\n' +
    'Sent to   : ' + contacts.join(', ') + '\n' +
    '─────────────────────\n' +
    'Please help immediately!\n' +
    'Sent via Sahayak AI';

  
  document.getElementById('alert-preview-box').innerText = message;

  
  document.getElementById('sos-step-2').style.display = 'none';
  document.getElementById('sos-step-3').style.display = 'block';
}




function findNearestHelp() {
  // 'selectedEmergency' holds 'medical', 'crime', or 'cyber'
  // Your teammate reads this variable in their location feature
  alert(
    'Passing to location finder...\n' +
    'Emergency type: ' + selectedEmergency +
    '\n\n(Teammate connects their feature here!)'
  );
  showScreen('screen-location');
}

function resetSOS() {
 
  selectedEmergency = '';
  userLocation = { lat: null, lng: null, text: 'Fetching...' };

  document.getElementById('contacts-list').innerHTML = '';
  document.getElementById('sos-step-1').style.display = 'block';
  document.getElementById('sos-step-2').style.display = 'none';
  document.getElementById('sos-step-3').style.display = 'none';

  showScreen('screen-home');
}
