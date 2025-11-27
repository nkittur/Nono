const STATION_TYPES = [
    { id: 'beans', label: 'Grind Beans', short: 'Beans', icon: '🫘', description: 'Prep the espresso beans.' },
    { id: 'espresso', label: 'Pull Espresso', short: 'Espresso', icon: '⚙️', description: 'Dial in the shot.' },
    { id: 'steam', label: 'Steam Milk', short: 'Steam', icon: '🌫️', description: 'Stretch silky milk.' },
    { id: 'flavor', label: 'Add Flavors', short: 'Flavor', icon: '🍯', description: 'Finish with syrups & dust.' }
];

const RECIPES = [
    { name: 'Campfire Latte', vibe: 'Smoky Maple', steps: ['beans', 'espresso', 'steam', 'flavor'] },
    { name: 'Moonlight Cortado', vibe: 'Bright Citrus', steps: ['beans', 'espresso', 'flavor'] },
    { name: 'Velvet Flat White', vibe: 'Silky Microfoam', steps: ['beans', 'espresso', 'steam'] },
    { name: 'Solar Sweet Cold Brew', vibe: 'Chilled Buzz', steps: ['beans', 'flavor'] },
    { name: 'Honeycomb Capp', vibe: 'Crunchy Finish', steps: ['beans', 'espresso', 'steam', 'flavor'] },
    { name: 'Spiced Oat Shaker', vibe: 'Cardamom Pop', steps: ['beans', 'espresso', 'flavor'] },
    { name: 'Dusk Mocha', vibe: 'Chocolatey', steps: ['beans', 'espresso', 'flavor', 'steam'] },
    { name: 'Breeze Americano', vibe: 'Citrus Mist', steps: ['beans', 'espresso', 'flavor'] }
];

const StationMap = STATION_TYPES.reduce((acc, station) => {
    acc[station.id] = station;
    return acc;
}, {});

const Game = {
    state: {
        playerCount: 3,
        players: [],
        tickets: [],
        completed: 0,
        pendingTransfer: null,
        holdState: { left: false, right: false }
    },

    init() {
        this.cacheDom();
        this.bindAirlockPads();
        this.renderNameInputs();
        this.renderBoard();
        this.setShiftMessage('Clock in to split the screen and start brewing.');
    },

    cacheDom() {
        this.nameGrid = document.getElementById('player-names');
        this.playerCountDisplay = document.getElementById('player-count-display');
        this.playerGrid = document.getElementById('player-grid');
        this.ticketBoard = document.getElementById('ticket-board');
        this.ticketsDone = document.getElementById('tickets-done');
        this.ticketsQueue = document.getElementById('tickets-queue');
        this.shiftMessage = document.getElementById('shift-message');
        this.airlockStatus = document.getElementById('airlock-status');
        this.airlockLeft = document.getElementById('airlock-left');
        this.airlockRight = document.getElementById('airlock-right');
        this.airlockCore = document.getElementById('airlock-core');
        this.airlockLeftLabel = document.getElementById('airlock-left-label');
        this.airlockRightLabel = document.getElementById('airlock-right-label');
    },

    bindAirlockPads() {
        const bindPad = (element, side) => {
            ['pointerdown', 'touchstart'].forEach(evt => {
                element.addEventListener(evt, event => {
                    event.preventDefault();
                    this.setHold(side, true);
                });
            });

            ['pointerup', 'pointerleave', 'pointercancel', 'touchend', 'touchcancel'].forEach(evt => {
                element.addEventListener(evt, () => this.setHold(side, false));
            });
        };

        bindPad(this.airlockLeft, 'left');
        bindPad(this.airlockRight, 'right');
    },

    setHold(side, value) {
        if (!this.state.pendingTransfer) {
            this.state.holdState.left = false;
            this.state.holdState.right = false;
            this.renderAirlock();
            return;
        }

        if (this.state.holdState[side] === value) return;
        this.state.holdState[side] = value;
        this.renderAirlock();

        if (this.state.holdState.left && this.state.holdState.right) {
            this.completeTransfer();
        }
    },

    adjustPlayerCount(delta) {
        const next = Math.min(4, Math.max(2, this.state.playerCount + delta));
        if (next === this.state.playerCount) return;
        this.state.playerCount = next;
        this.playerCountDisplay.textContent = next;
        this.renderNameInputs();
    },

    renderNameInputs() {
        const inputs = [];
        for (let i = 0; i < this.state.playerCount; i++) {
            inputs.push(`
                <label class="name-field">
                    <span>Player ${i + 1}</span>
                    <input type="text" class="name-input" data-index="${i}" placeholder="Barista ${i + 1}">
                </label>
            `);
        }
        this.nameGrid.innerHTML = inputs.join('');
    },

    startShift() {
        const nameInputs = Array.from(document.querySelectorAll('.name-input'));
        const names = nameInputs.map((input, idx) => input.value.trim() || `Barista ${idx + 1}`);

        this.state.players = names.map((name, idx) => ({
            id: `p${idx + 1}`,
            name,
            stations: this.generateStations(),
            working: null
        }));

        this.state.tickets = [];
        this.state.completed = 0;
        this.state.pendingTransfer = null;
        this.state.holdState = { left: false, right: false };

        const rushMode = document.getElementById('rush-mode').checked;
        const initialTickets = rushMode ? this.state.playerCount + 1 : this.state.playerCount;
        for (let i = 0; i < initialTickets; i++) {
            this.addTicket(false);
        }

        this.renderBoard();
        this.setShiftMessage('Stations assigned! Tap a ticket to begin.');
    },

    generateStations() {
        const pool = [...STATION_TYPES];
        const picks = [];
        while (picks.length < 2) {
            const index = Math.floor(Math.random() * pool.length);
            picks.push(pool[index].id);
            pool.splice(index, 1);
            if (pool.length === 0) {
                pool.push(...STATION_TYPES);
            }
        }
        return picks;
    },

    addTicket(renderAfter = true) {
        const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
        const ticket = {
            id: `ticket-${Date.now()}-${Math.floor(Math.random() * 999)}`,
            name: recipe.name,
            vibe: recipe.vibe,
            steps: recipe.steps.map((type, idx) => ({
                id: `${type}-${idx}`,
                type,
                label: StationMap[type].label,
                status: idx === 0 ? 'ready' : 'locked'
            })),
            currentStep: 0,
            status: 'queued',
            location: 'counter',
            awaitingTransfer: null,
            workingPlayer: null,
            lastStation: null
        };

        this.state.tickets.push(ticket);
        if (renderAfter) {
            this.renderBoard();
            this.setShiftMessage(`${ticket.name} just hit the counter!`);
        }
    },

    getActionableTickets(playerId, stationId) {
        return this.state.tickets.filter(ticket => {
            if (ticket.status === 'complete') return false;
            const step = ticket.steps[ticket.currentStep];
            if (!step || step.type !== stationId) return false;

            if (ticket.location === 'counter' && step.status === 'ready') return true;
            return ticket.location === playerId && step.status === 'ready';
        });
    },

    workStep(ticketId, playerId, stationId) {
        const ticket = this.state.tickets.find(t => t.id === ticketId);
        if (!ticket || ticket.workingPlayer) return;
        const step = ticket.steps[ticket.currentStep];
        if (!step || step.type !== stationId || step.status !== 'ready') return;

        ticket.workingPlayer = playerId;
        step.status = 'in-progress';
        this.setShiftMessage(`${this.getPlayerName(playerId)} is working on ${ticket.name}`, '');
        this.renderBoard();

        const workTime = 1300 + Math.random() * 800;
        ticket.timer = setTimeout(() => {
            this.finishStep(ticketId, playerId);
        }, workTime);
    },

    finishStep(ticketId, playerId) {
        const ticket = this.state.tickets.find(t => t.id === ticketId);
        if (!ticket) return;
        const step = ticket.steps[ticket.currentStep];
        if (!step) return;

        step.status = 'done';
        ticket.workingPlayer = null;
        const finishedType = step.type;
        ticket.currentStep += 1;
        ticket.lastStation = finishedType;

        if (ticket.currentStep >= ticket.steps.length) {
            ticket.status = 'ready';
            ticket.location = 'counter';
            ticket.awaitingTransfer = null;
            this.setShiftMessage(`${ticket.name} is ready for pickup!`, 'success');
        } else {
            const nextStep = ticket.steps[ticket.currentStep];
            nextStep.status = 'ready';

            if (this.playerHasStation(playerId, nextStep.type)) {
                ticket.location = playerId;
                this.setShiftMessage(`${this.getPlayerName(playerId)} can keep working on ${ticket.name}.`);
            } else {
                const receiver = this.findPlayerWithStation(nextStep.type, playerId);
                if (receiver) {
                    ticket.location = playerId;
                    ticket.awaitingTransfer = receiver.id;
                    this.queueTransfer(ticket.id, playerId, receiver.id, true);
                } else {
                    ticket.location = 'counter';
                    this.setShiftMessage(`No station available, ${ticket.name} returned to counter.`, 'warning');
                }
            }
        }

        this.renderBoard();
    },

    playerHasStation(playerId, stationId) {
        const player = this.state.players.find(p => p.id === playerId);
        return player ? player.stations.includes(stationId) : false;
    },

    findPlayerWithStation(stationId, excludeId = null) {
        return this.state.players.find(player => player.stations.includes(stationId) && player.id !== excludeId);
    },

    queueTransfer(ticketId, fromId, toId, auto = false) {
        const ticket = this.state.tickets.find(t => t.id === ticketId);
        if (!ticket) return;
        if (this.state.pendingTransfer && this.state.pendingTransfer.ticketId !== ticketId) {
            this.setShiftMessage('Airlock busy! Finish the current handoff first.', 'warning');
            return;
        }

        const fromName = this.getPlayerName(fromId);
        const toName = this.getPlayerName(toId);

        this.state.pendingTransfer = {
            ticketId,
            from: fromId,
            to: toId,
            label: `${ticket.name} → ${StationMap[ticket.steps[ticket.currentStep]?.type]?.short || ''}`
        };
        this.state.holdState = { left: false, right: false };

        this.airlockLeftLabel.textContent = `${fromName}`;
        this.airlockRightLabel.textContent = `${toName}`;
        this.setShiftMessage(`${fromName} needs ${toName} on the airlock!`, 'warning');
        this.renderAirlock();
        if (!auto) {
            this.renderBoard();
        }
    },

    completeTransfer() {
        const pending = this.state.pendingTransfer;
        if (!pending) return;
        const ticket = this.state.tickets.find(t => t.id === pending.ticketId);
        if (!ticket) return;

        ticket.location = pending.to;
        ticket.awaitingTransfer = null;
        this.state.pendingTransfer = null;
        this.state.holdState = { left: false, right: false };
        const receiverName = this.getPlayerName(ticket.location);
        this.setShiftMessage(`${receiverName} caught the drink! Keep it moving.`, 'success');
        this.renderBoard();
        this.renderAirlock();
    },

    deliverTicket(ticketId) {
        const index = this.state.tickets.findIndex(t => t.id === ticketId);
        if (index === -1) return;
        const [ticket] = this.state.tickets.splice(index, 1);
        this.state.completed += 1;
        this.setShiftMessage(`${ticket.name} served!`, 'success');

        if (document.getElementById('auto-refill').checked) {
            this.addTicket(false);
        }
        this.renderBoard();
    },

    getPlayerName(id) {
        if (id === 'counter') return 'Counter';
        const player = this.state.players.find(p => p.id === id);
        return player ? player.name : 'Unknown';
    },

    renderBoard() {
        this.renderPlayers();
        this.renderTickets();
        this.renderAirlock();
        this.updateCounters();
        if (this.playerGrid) {
            const splits = Math.max(1, this.state.players.length || 1);
            this.playerGrid.style.setProperty('--split-count', splits);
        }
    },

    renderPlayers() {
        if (!this.playerGrid) return;
        if (!this.state.players.length) {
            this.playerGrid.innerHTML = '<p class="queue-empty">Assign stations to populate the split screen.</p>';
            return;
        }
        const html = this.state.players.map(player => {
            const stationHtml = player.stations.map(stationId => this.renderStationCard(player, stationId)).join('');
            const holding = this.state.tickets.filter(ticket => ticket.location === player.id).length;
            return `
                <div class="player-card">
                    <div class="player-header">
                        <h3>${player.name}</h3>
                        <span class="ticket-tag">${holding} in hand</span>
                    </div>
                    <div class="station-board">${stationHtml}</div>
                </div>
            `;
        }).join('');
        this.playerGrid.innerHTML = html;
    },

    renderStationCard(player, stationId) {
        const station = StationMap[stationId];
        const readyTickets = this.getActionableTickets(player.id, stationId);
        const incomingTransfers = this.state.tickets.filter(ticket => {
            if (ticket.awaitingTransfer !== player.id || ticket.location === player.id) return false;
            const nextStep = ticket.steps[ticket.currentStep];
            return nextStep && nextStep.type === stationId;
        });
        const outgoingTickets = this.state.tickets.filter(ticket => {
            return ticket.location === player.id
                && ticket.awaitingTransfer
                && ticket.lastStation === stationId;
        });

        const incomingReadyHtml = readyTickets.map(ticket => {
            const stepNumber = ticket.currentStep + 1;
            const total = ticket.steps.length;
            const fromName = ticket.location === 'counter' ? 'Counter' : this.getPlayerName(ticket.location);
            const working = ticket.workingPlayer === player.id;
            const actions = working
                ? '<span class="working-pill">Brewing…</span>'
                : `<button class="btn btn-primary btn-mini" onclick="Game.workStep('${ticket.id}', '${player.id}', '${stationId}')">Work</button>`;
            return `
                <div class="flow-item">
                    <div>
                        <strong>${ticket.name}</strong>
                        <div class="flow-meta">Step ${stepNumber}/${total} · from ${fromName}</div>
                    </div>
                    <div class="flow-actions">${actions}</div>
                </div>
            `;
        }).join('');

        const incomingTransferHtml = incomingTransfers.map(ticket => {
            const fromName = this.getPlayerName(ticket.location);
            const activeTransfer = this.state.pendingTransfer && this.state.pendingTransfer.ticketId === ticket.id;
            const disabled = this.state.pendingTransfer && this.state.pendingTransfer.ticketId !== ticket.id;
            const control = activeTransfer
                ? '<span class="status-pill">On the Airlock</span>'
                : `<button class="btn btn-outline btn-mini" ${disabled ? 'disabled' : ''} onclick="Game.queueTransfer('${ticket.id}', '${ticket.location}', '${player.id}')">Grab via Airlock</button>`;
            return `
                <div class="flow-item pending">
                    <div>
                        <strong>${ticket.name}</strong>
                        <div class="flow-meta">Waiting on ${fromName}</div>
                    </div>
                    <div class="flow-actions">${control}</div>
                </div>
            `;
        }).join('');

        const outgoingHtml = outgoingTickets.length ? outgoingTickets.map(ticket => {
            const toName = this.getPlayerName(ticket.awaitingTransfer);
            const activeTransfer = this.state.pendingTransfer && this.state.pendingTransfer.ticketId === ticket.id;
            const disabled = this.state.pendingTransfer && this.state.pendingTransfer.ticketId !== ticket.id;
            const control = activeTransfer
                ? '<span class="status-pill">On the Airlock</span>'
                : `<button class="btn btn-outline btn-mini" ${disabled ? 'disabled' : ''} onclick="Game.queueTransfer('${ticket.id}', '${player.id}', '${ticket.awaitingTransfer}')">Send via Airlock</button>`;
            return `
                <div class="flow-item">
                    <div>
                        <strong>${ticket.name}</strong>
                        <div class="flow-meta">Send to ${toName}</div>
                    </div>
                    <div class="flow-actions">${control}</div>
                </div>
            `;
        }).join('') : '<div class="queue-empty">Nothing to send</div>';

        const incomingHtml = (incomingReadyHtml + incomingTransferHtml) || '<div class="queue-empty">No drinks incoming</div>';

        return `
            <div class="station-card" data-type="${stationId}">
                <div class="station-title">
                    <span>${station.icon}</span>
                    <div>
                        ${station.label}
                        <div class="station-description">${station.description}</div>
                    </div>
                </div>
                <div class="station-lanes">
                    <div class="flow-lane">
                        <div class="flow-label">Incoming Shelf</div>
                        <div class="flow-list">
                            ${incomingHtml}
                        </div>
                    </div>
                    <div class="flow-lane">
                        <div class="flow-label">Outgoing Shelf</div>
                        <div class="flow-list">
                            ${outgoingHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderTickets() {
        if (!this.ticketBoard) return;
        if (!this.state.tickets.length) {
            this.ticketBoard.innerHTML = '<p class="queue-empty">No tickets right now. Hit "Add Ticket" for a rush order!</p>';
            return;
        }

        this.ticketBoard.innerHTML = this.state.tickets.map(ticket => {
            const stepBadges = ticket.steps.map(step => {
                return `
                    <div class="ticket-step" data-status="${step.status}">
                        <span>${StationMap[step.type].icon} ${step.label}</span>
                        <strong>${step.status}</strong>
                    </div>
                `;
            }).join('');

            const classes = [
                'ticket-card',
                ticket.status === 'ready' ? 'ready' : '',
                ticket.awaitingTransfer ? 'transfer-needed' : ''
            ].join(' ');

            const tagText = ticket.status === 'ready'
                ? 'Ready'
                : ticket.awaitingTransfer ? 'Needs Airlock' : 'In Progress';

            const actions = ticket.status === 'ready'
                ? `<div class="ticket-actions"><button class="btn btn-primary btn-mini" onclick="Game.deliverTicket('${ticket.id}')">Place on Ticket</button></div>`
                : '';

            return `
                <article class="${classes}">
                    <div class="ticket-title">${ticket.name}</div>
                    <div class="ticket-meta">
                        <span>${ticket.vibe}</span>
                        <span class="ticket-tag">${tagText}</span>
                    </div>
                    <div class="ticket-steps">${stepBadges}</div>
                    ${actions}
                </article>
            `;
        }).join('');
    },

    renderAirlock() {
        if (!this.airlockStatus) return;
        if (!this.state.pendingTransfer) {
            this.airlockStatus.textContent = 'Waiting for a handoff...';
            this.airlockLeft.classList.remove('active');
            this.airlockRight.classList.remove('active');
            this.airlockCore.classList.remove('pending', 'transfer');
            this.airlockLeftLabel.textContent = 'Hold';
            this.airlockRightLabel.textContent = 'Hold';
            return;
        }

        const { from, to, label } = this.state.pendingTransfer;
        this.airlockStatus.textContent = `${this.getPlayerName(from)} → ${this.getPlayerName(to)} :: ${label}`;

        this.airlockLeftLabel.textContent = this.getPlayerName(from);
        this.airlockRightLabel.textContent = this.getPlayerName(to);

        this.airlockLeft.classList.toggle('active', this.state.holdState.left);
        this.airlockRight.classList.toggle('active', this.state.holdState.right);
        this.airlockCore.classList.add('pending');
        this.airlockCore.classList.toggle('transfer', this.state.holdState.left && this.state.holdState.right);
    },

    updateCounters() {
        if (this.ticketsDone) {
            this.ticketsDone.textContent = this.state.completed;
        }
        if (this.ticketsQueue) {
            this.ticketsQueue.textContent = this.state.tickets.length;
        }
    },

    setShiftMessage(message, type = '') {
        if (!this.shiftMessage) return;
        this.shiftMessage.textContent = message;
        this.shiftMessage.classList.remove('success', 'warning');
        if (type) this.shiftMessage.classList.add(type);
    }
};

window.Game = Game;
Game.init();
