// This is a simplified Mock-Up of the Mesh Logic
// In the real build, we hook this into the Capacitor Bluetooth Plugin

const MeshNetwork = {
    myID: crypto.randomUUID(), // Your unique ghost ID
    knownPeers: [],
    messages: [],

    // 1. Initialize the Hardware
    init: async function() {
        console.log("Initializing Ghost-Net Protocol...");
        this.startScanning();
    },

    // 2. Scan for nearby Ghosts (Bluetooth)
    startScanning: function() {
        // This simulates finding a device with a specific Service UUID
        console.log("Scanning for frequency: 0xFEAA...");
        
        // Real implementation hooks into: BluetoothLe.requestDevice()
        setInterval(() => {
            this.broadcastPresence();
        }, 5000);
    },

    // 3. The "Hello" Packet
    broadcastPresence: function() {
        const packet = {
            type: 'PING',
            sender: this.myID,
            hopCount: 0
        };
        console.log("Broadcasting heartbeat:", packet);
    },

    // 4. Relay Logic (The "Gossip")
    onMessageReceived: function(packet) {
        if (this.messages.includes(packet.id)) return; // Already saw it
        
        console.log("New Intel Received:", packet);
        this.messages.push(packet.id);

        // If hop count is low, relay it to neighbors
        if (packet.hopCount < 5) {
            packet.hopCount++;
            this.relayMessage(packet);
        }
    },

    relayMessage: function(packet) {
        console.log("Relaying packet to neighbors...");
        // Transmit data via BLE Write
    }
};

// Start the engine
MeshNetwork.init();


// GHOST-NET LOGIC CONTROLLER

const UI = {
    log: (msg) => {
        const box = document.getElementById('console-log');
        const time = new Date().toLocaleTimeString();
        const entry = `<div class="log-entry"><span class="log-time">[${time}]</span> ${msg}</div>`;
        box.innerHTML += entry;
        box.scrollTop = box.scrollHeight; // Auto-scroll
    },
    setStatus: (status) => {
        document.getElementById('net-status').innerText = status;
    },
    setID: (id) => {
        document.getElementById('node-id').innerText = "ID: " + id.substring(0, 8);
    }
};

const MeshNetwork = {
    myID: crypto.randomUUID(), 
    
    init: function() {
        UI.log("CORE SYSTEM: STARTED");
        UI.setID(this.myID);
        UI.setStatus("ACTIVE");

        // Simulate Hardware Scan (For testing without real Bluetooth first)
        this.mockScan();
    },

    mockScan: function() {
        UI.log("HARDWARE: Initializing Bluetooth adapter...");
        setTimeout(() => {
            UI.log("SCANNER: 3 Nodes Detected in range.");
        }, 2000);
    },

    broadcast: function(text) {
        if(!text) return;
        UI.log(`TX [SELF]: ${text}`);
        // Here we would call the Bluetooth Write function
    }
};

// Start System
MeshNetwork.init();

// Button Function
function sendMessage() {
    const input = document.getElementById('msg-input');
    MeshNetwork.broadcast(input.value);
    input.value = "";
}

