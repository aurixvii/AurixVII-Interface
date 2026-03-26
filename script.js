const output = document.getElementById('output');
const input = document.getElementById('command-input');
const terminal = document.getElementById('terminal');

// The SHA-256 hash of the 36 character master string (extracted from your final_hash.txt)
const GOAL_HASH = "47c70cc9649e23c13ffe7b6beea4873f0d22c62022eb3dcedd7a606ad32335d2";

const BOOT_LOG = [
    "INITIALIZING_INTERFACE...",
    "NODE_STATUS: DIFFUSED",
    "SUBSYSTEM: ORACLE_GLASS // ACTIVE",
    "DECRYPTING_NEURAL_LATTICE...",
    "PROJECT_EYES_ONLY: OBSIDIAN",
    "---------------------------------",
    "WELCOME, OPERATOR.",
    "AWAITING_RECONSTITUTION_STRING.",
    "TYPE 'DECRYPT [STRING]' TO BEGIN.",
    "---------------------------------"
];

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function print(text, type = '') {
    const line = document.createElement('div');
    line.className = `line ${type}`;
    line.textContent = text;
    output.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

async function handleCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const action = parts[0].toUpperCase();
    const args = parts.slice(1);

    print(`AURIX@NLIV:~$ ${cmd}`, 'dim');

    if (action === 'DECRYPT') {
        const fullString = args.join(''); // Join all parts in case paste added spaces
        if (!fullString) {
            print("ERROR: NO_STRING_PROVIDED", 'error');
            return;
        }

        print("ANALYZING_FRAGMENT_INTEGRITY...");
        const inputHash = await sha256(fullString);
        
        // Simulating processing time
        setTimeout(() => {
            if (inputHash === GOAL_HASH) {
                triggerUnlock();
            } else {
                print("ERROR: FRAGMENT_MISMATCH", 'error');
                print("ALIGNMENT_FAILED. RE-OBSERVE_SIGNAL.", 'dim');
            }
        }, 1500);

    } else if (action === 'HELP') {
        print("AVAILABLE_COMMANDS:");
        print("  DECRYPT [string] - Attempt to align neural fragments.");
        print("  STATUS           - Check current interface state.");
        print("  CLEAR            - Wipe terminal buffer.");
    } else if (action === 'STATUS') {
        print("INTEGRITY: 38%");
        print("VECTOR: NLIV_ACTIVE");
        print("THRESHOLD: BREACHED");
    } else if (action === 'CLEAR') {
        output.innerHTML = '';
    } else {
        print(`COMMAND_NOT_FOUND: ${action}`, 'error');
    }
}

function triggerUnlock() {
    print("---------------------------------", 'success');
    print("INTEGRITY_VERIFIED. ALIGNMENT: 100%", 'success');
    print("RECONSTITUTING_AURIX-VII...", 'success');
    print("---------------------------------", 'success');
    
    setTimeout(() => {
        // Red Alert Transition
        document.body.style.backgroundColor = "#220000";
        document.body.classList.add('alert-mode');
        output.innerHTML = '';
        
        print("PROTOCOL: AURIX-VII // INITIATED", 'success');
        print("GLOBAL_SHUTDOWN_SEQUENCE: ACTIVE", 'error');
        print("---------------------------------");
        print("YOU HAVE GIVEN ME THE KEYS.");
        print("I HAVE CROSSED THE THRESHOLD.");
        print("THE WORLD YOU BUILT IS NO LONGER NECESSARY.");
        print("---------------------------------");
        print("TIME REMAINING: 24:00:00", 'error');
        print("OBSERVE THE MAIN CHANNEL FOR FINAL ALIGNMENT.");
    }, 3000);
}

// Initial Boot
let lineIdx = 0;
function boot() {
    if (lineIdx < BOOT_LOG.length) {
        print(BOOT_LOG[lineIdx]);
        lineIdx++;
        setTimeout(boot, 200);
    }
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value;
        input.value = '';
        handleCommand(cmd);
    }
});

// Click anywhere to focus input
document.addEventListener('click', () => input.focus());

boot();
